<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set("Asia/Dhaka");
header('Access-Control-Allow-Origin: *');
class Api extends CI_Controller {
	protected $timesinplay;
	protected $timespregame;
	function __construct()
    {
			parent::__construct();
			$this->load->driver('cache');
			$this->timesinplay=0;
			$this->timespregame=0;
    }
	public function get_pregame($olddate=null,$hour=null){
		$prediction=null;
		$callback="";
		$currentHour=intval($hour);
		$dateObject=$this->workingdate($olddate);
		if (array_key_exists('callback', $_GET) == TRUE) {
			$callback = $_GET['callback'];
		}
		if($currentHour>=0 && $currentHour<=11){
			$startTime=$dateObject[2].' 12:00:00';
			$endTime=$dateObject[1].' 11:59:00' ;
		}else if($currentHour>=12 && $currentHour<=17){
			$startTime=$dateObject[2].' 12:00:00';
			$endTime=$dateObject[0].' 11:59:00' ;
		}else if($currentHour>=18 && $currentHour<=23){
			$startTime=$dateObject[1].' 12:00:00';
			$endTime=$dateObject[0].' 11:59:00' ;
		}

		// $startTime=$dateObject[1].' 12:00:00';
		// $endTime=$dateObject[0].' 11:59:00' ;
		 $prediction=$this->db->query('call get_pregame(?,?)',array($startTime,$endTime));
		 $data=json_encode($prediction->result());
			echo $callback . '(' . $data . ');';

	}
	public function get_running($olddate=null,$hour=null){
		$prediction=null;
		$callback="";
		$currentHour=intval($hour);
		$dateObject=$this->workingdate($olddate);
		if (array_key_exists('callback', $_GET) == TRUE) {
			$callback = $_GET['callback'];
		}

		if($currentHour>=0 && $currentHour<=11){
			$startTime=$dateObject[2].' 12:00:00';
			$endTime=$dateObject[1].' 11:59:00' ;
		}else if($currentHour>=12 && $currentHour<=17){
			$startTime=$dateObject[2].' 12:00:00';
			$endTime=$dateObject[0].' 11:59:00' ;
		}else if($currentHour>=18 && $currentHour<=23){
			$startTime=$dateObject[1].' 12:00:00';
			$endTime=$dateObject[0].' 11:59:00' ;
		}
		
		// $startTime=$dateObject[1].' 12:00:00';
		// $endTime=$dateObject[0].' 11:59:00' ;
		$this->db->trans_begin();
		$dtmatch=$this->db->query('call get_prediction_inplay(?,?)',array($startTime,$endTime));
		mysqli_next_result( $this->db->conn_id );
		$dtprediction=$this->db->query('call get_prediction()');
		
		if ($this->db->trans_status() === FALSE){
				$this->db->trans_rollback();
		}else{
				$this->db->trans_commit();
		}

		$match=$dtmatch->result_array();
		$prediction=$dtprediction->result_array();
		for($i=0;$i<count($match);$i++){
			$detail=array();
			$underOver=array();
			for($j=0;$j<count($prediction);$j++){
				if($match[$i]["idmatch"]==$prediction[$j]["match_code"] && $prediction[$j]["typeprediction"]=="HDP"){
					array_push($detail,$prediction[$j]);
				}else if($match[$i]["idmatch"]==$prediction[$j]["match_code"] && $prediction[$j]["typeprediction"]=="OU"){
					array_push($underOver,$prediction[$j]);
				}else if($match[$i]["idmatch"]==$prediction[$j]["match_code"]){
					array_push($detail,$prediction[$j]);
					array_push($underOver,$prediction[$j]);
				}
			}
			$match[$i]["detail"]=$detail;
			$match[$i]["detailou"]=$underOver;
		}
		echo $callback . '(' . json_encode($match) . ');';
	}

	public function get_expired_pregame(){
		$prediction=null;
		$callback="";
		if($this->cache->file->is_supported() && $this->cache->file->get('matchfinished')) {
			$prediction=$this->cache->file->get('matchfinished') ;
		}else{
			$prediction='{"MatchesFinished":[]}';
		};
		if (array_key_exists('callback', $_GET) == TRUE) {
			$callback = $_GET['callback'];
		}
		echo $callback . '(' . json_encode($prediction) . ');';
	}

	public function get_running_cron(){
		set_time_limit(0);
			$soap_client=new SoapClient('http://118.107.179.27:13881/Vig_WebService/Vig_WebService.asmx?WSDL');
			$prediction=json_decode($soap_client->Prediction_Running()->Prediction_RunningResult,true)['Running'];
	
		 for($i=0;$i<count($prediction);$i++){
			 $data=$prediction[$i];
			 $sql='call insertmatch(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
			 $dateconvert=(new DateTime($data['match_dt']))->format('Y-m-d H:i:s');
			$this->db->query($sql,array(
				$data['match_code'],
				$data['active'],
				$dateconvert,
				$data['match_period'],
				$data['match_minute'],
				$data['league'],
				$data['team_home'],
				$data['team_away'],
				$data['score_home'],
				$data['score_away'],
				$data['rb_id'],
				$data['bet_period'],
				$data['sys_company'],
				$data['sbo']['hdp'],
				$data['sbo']['odds_home'],
				$data['sbo']['odds_away'],
				$data['sbo']['ou'],
				$data['sbo']['odds_over'],
				$data['sbo']['odds_under'],
				$data['ibc']['hdp'],
				$data['ibc']['odds_home'],
				$data['ibc']['odds_away'],
				$data['ibc']['ou'],
				$data['ibc']['odds_over'],
				$data['ibc']['odds_under'],
				$data['sys']['hdp'],
				$data['sys']['odds_home'],
				$data['sys']['odds_away'],
				$data['sys']['ou'],
				$data['sys']['odds_over'],
				$data['sys']['odds_under'],
				$data['pick_hdp'],
				$data['pick_ou']
			));
		 };
		 if($this->timesinplay<3){
			sleep(15);
			$this->timesinplay=$this->timesinplay+1;
			$this->get_running_cron();
		 }else if($this->timesinplay==3){
			$this->timesinplay=0;
		 }
	}
	public function get_pregame_cron(){
		$soap_client=new SoapClient('http://118.107.179.27:13881/Vig_WebService/Vig_WebService.asmx?WSDL');
		$prediction=json_decode($soap_client->Prediction_Pregame()->Prediction_PregameResult,true)['Pregame'];
	
		foreach($prediction as $item){
				$data=$item;
				$sql='call insert_pregame(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
				$dateconvert=(new DateTime($data['match_dt']))->format('Y-m-d H:i:s');
				$this->db->query($sql,array(
					$data['match_code'],
					$data['active'],
					$dateconvert,
					$data['match_period'],
					$data['match_minute'],
					$data['league'],
					$data['team_home'],
					$data['team_away'],
					$data['score_home'],
					$data['score_away'],
					$data['rb_id'],
					$data['bet_period'],
					$data['sys_company'],
					$data['sbo']['hdp'],
					$data['sbo']['odds_home'],
					$data['sbo']['odds_away'],
					$data['sbo']['ou'],
					$data['sbo']['odds_over'],
					$data['sbo']['odds_under'],
					$data['ibc']['hdp'],
					$data['ibc']['odds_home'],
					$data['ibc']['odds_away'],
					$data['ibc']['ou'],
					$data['ibc']['odds_over'],
					$data['ibc']['odds_under'],
					$data['sys']['hdp'],
					$data['sys']['odds_home'],
					$data['sys']['odds_away'],
					$data['sys']['ou'],
					$data['sys']['odds_over'],
					$data['sys']['odds_under'],
					$data['pick_hdp'],
					$data['pick_ou']
				));
		};
		if($this->timespregame<3){
			sleep(15);
			$this->timespregame=$this->timespregame+1;
			$this->get_pregame_cron();
		}else if($this->timespregame==3){
			$this->timespregame=0;
		}
	}
	public function livecast($matchId=null,$ipAddress=null){
		$soap_client=new SoapClient('http://realtime.inplay.club/livecenter/services.asmx?WSDL',array('exceptions'=>true,'trace' => 1));
		$params =["PrivateKey" => "bSxp4QmfU2rF6QcbphAtjsxxV8MhN2jyYvh1HWYoRqxMnVCa6uH2bNDiCsfrIwSo",
		 "UserName" => "brandon",
		 "MatchId"=>$matchId,
		 "Referrer"=>"INP",
		 "IP"=>$ipAddress,
		 "Language"=>"EN",
		 "Company"=>"AM"];
		$result = $soap_client->GenerateUrlByRef(array('param'=>$params))->GenerateUrlByRefResult;
		echo($result->Url);
	}
	public function matchWdate($matchdt){
		$dt=date('d',strtotime('-12 hours',strtotime($matchdt)));
		return $dt;
	}

	public function wDate(){
		$wdate=0;
		if(strtotime(date('H:i'))>=strtotime("12:00 pm")){
			$wdate=intval(date('d'));
		}else{
			$wdate=intval(date('d'))-1;
		}
		return $wdate;
	}

	public function existsInArray($array,$match_code) {
		foreach ($array as $item) {
			if ($item['match_code'] == $match_code) {
						return true;
					}
			}
		return false;
	}

	public function removeMatch(){
		$matchfinished=json_decode($this->cache->file->get('yesterday_match'),true)['MatchesFinished'];
		$wdate=$this->matchWdate(date('Y-m-d H:i:s'));
		$newmatches=array();
		for($i=0;$i<count($matchfinished);$i++){
			$macthDate=$this->matchWdate($matchfinished[$i]['match_dt']);
			if(intval($macthDate)==intval($wdate) || intval($macthDate)==intval($wdate)-1){
				//unset($matchfinished[$i]);
				array_push($newmatches,$matchfinished[$i]);
			}
		}
		$this->cache->file->save('yesterday_match', "{\"MatchesFinished\":".json_encode($newmatches)."}", 0);
	}

	public function date_sort($a,$b,$direction){
			$ad = intval((new DateTime($a['match_dt']))->format('d'));
			$bd = intval((new DateTime($b['match_dt']))->format('d'));
		
			if ($ad == $bd) {
				return 0;
			}
		
			if($direction=='DESC'){
				return $ad < $bd ? 1 : -1;
			}else{
				return $ad < $bd ? -1 : 1;
			}
	}

	public function workingdate($date){
		// $dt=array(date('Y-m-d',strtotime('-1 day',strtotime($date))),date('Y-m-d',strtotime($date)));
		$dt=array(date('Y-m-d',strtotime('+1 day',strtotime($date))),date('Y-m-d',strtotime($date)),date('Y-m-d',strtotime('-1 day',strtotime($date))));
		return $dt;
	}
}

class wsClient{
	public $PrivateKey;
	public $UserName;
	public $MatchId;
	public $Referrer;
	public $IP;
	public $Language;
	public $Home;
	public $Away;
	public $Company;
}