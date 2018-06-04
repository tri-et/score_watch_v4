import Axios from 'axios';
class GetData {
  constructor() {
    this.datePrediction = "";
    this.dateLiveScore="";
    this.timeoutInPlay=null;
    this.timeoutPregame=null;
  }

  getInPlay() {
    return Axios.get('index.php/api/get_running/'+this.datePrediction+'/'+(new Date().getHours()),{
      timeout:100000
    })
  }
  getPreGame() {
    return Axios.get('index.php/api/get_pregame/'+this.datePrediction+'/'+(new Date().getHours()),{
      timeout:100000
    })
  }
  getDataInPlay(app){
    var that = this
    Axios.get('index.php/api/get_running/'+this.datePrediction+'/'+(new Date().getHours())).then(function(inplay){
      var dataInplay = JSON.parse(inplay.data.replace(/(\)\;)|(\()/g, ""))
      app.$store.commit('setdataInplay', dataInplay)
      setTimeout(() => {
        that.getDataInPlay(app)
      }, 5000)
    })
  }
  getDataPregame(app){
    var that = this
    Axios.get('index.php/api/get_pregame/'+this.datePrediction+'/'+(new Date().getHours())).then(function(pregame){
      var dataPregame = JSON.parse(pregame.data.replace(/(\)\;)|(\()/g, ""))
      app.$store.commit('setdataPreGame', dataPregame)
      setTimeout(() => {
        that.getDataPregame(app)
      }, 60000)
    })
  }
  getInPlayPreGame(app,datepre) {
    var that = this
    this.datePrediction=datepre
    clearTimeout(this.timeoutInPlay)
    clearTimeout(this.timeoutPregame)
    Axios.all([this.getInPlay(), this.getPreGame()]).then(Axios.spread(function (inplay, pregame) {
      app.$store.commit("setisShowError", false)
      var dataInplay = JSON.parse(inplay.data.replace(/(\)\;)|(\()/g, ""))
      var dataPregame = JSON.parse(pregame.data.replace(/(\)\;)|(\()/g, ""))
      var leagueInPlay = Array.from(new Set(dataInplay.map(x => x.league)))
      var leaguePregame = Array.from(new Set(dataPregame.map(x => x.league)))
      var allLeague = Array.from(new Set(leagueInPlay.concat(leaguePregame)))
      app.$store.commit('setallLeague', allLeague)
      app.$store.commit('setallLeagueDesk', allLeague)
      app.$store.commit('setdataPreGame', dataPregame)
      app.$store.commit('setdataInplay', dataInplay)
      app.$store.commit('setloadingPredictions',false)
      that.timeoutInPlay=setTimeout(() => {
        that.getDataInPlay(app)
      }, 5000)
      that.timeoutPregame=setTimeout(() => {
        that.getDataPregame(app)
      }, 60000)
    })).catch(function(er){
      if(er.code=='ECONNABORTED'){
        app.$store.commit("setisShowError", true)
      }
    })
  }

  getTimeLineData() {
    return Axios.get('http://www.hasilskor.com/API/JSON.aspx?callback=callbackJSON&sport=soccerDA&s=26PDpiffaaBbGrBdfgnrK2pknndskc1f3IMeKLW6PqdprBMHMqSTQ7gcmlcx7jZMxmyeTTBXRqwDh5p044MJHrf&date=&lut=&isJSONP=true&_=1506409621930')
  }

  getStatsData() {
    return Axios.get('http://www.hasilskor.com/API/JSON.aspx?callback=callbackJSON&sport=soccerDB&s=26PDpiffaaBbGrBdfgnrK2pknndskc1f3IMeKLW6PqdprBMHMqSTQ7gcmlcx7jZMxmyeTTBXRqwDh5p044MJHrf&date=&lut=&isJSONP=true&_=1506412139882')
  }

  getMatchLiveScore() {
    return Axios.get('http://www.hasilskor.com/API/JSON.aspx?sport=soccer&s=26PDpiffaaBbGrBdfgnrK2pknndskc1f3IMeKLW6PqdprBMHMqSTQ7gcmlcx7jZMxmyeTTBXRqwDh5p044MJHrf')
  }
  getMatchLiveScoreByDate() {
    return Axios.get('http://www.hasilskor.com/API/JSON.aspx?date=' + this.dateLiveScore + '&sport=soccer&s=26PDpiffaaBbGrBdfgnrK2pknndskc1f3IMeKLW6PqdprBMHMqSTQ7gcmlcx7jZMxmyeTTBXRqwDh5p044MJHrf')
  }

  getLiveScore(app,datelive) {
    var that = this
    this.dateLiveScore=datelive
    var currentTime = new Date()
    var today = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate()
    Axios.all([this.getTimeLineData(), this.getStatsData(),datelive==today?this.getMatchLiveScore():this.getMatchLiveScoreByDate(this.dateLiveScore)]).then(Axios.spread(function (timeline, stats, {data}) {
      var leftData = []
      var rightData = []
      var allLeagueLiveScore = Array.from(new Set(data.r.map(x => x[5])))
      allLeagueLiveScore.forEach(function (item) {
        var datafilter = data.r.filter(x => x[5] == item)
        if (leftData.length == rightData.length) {
          datafilter.forEach(function (match) {
            leftData.push(match)
          })
        } else if (leftData.length > rightData.length) {
          datafilter.forEach(function (match) {
            rightData.push(match)
          })
        } else {
          datafilter.forEach(function (match) {
            leftData.push(match)
          })
        }
      })
      app.$store.commit('setdataLiveScoreLeft', leftData)
      app.$store.commit('setdataLiveScoreRight', rightData)
      app.$store.commit('setallLeagueLiveScore', allLeagueLiveScore)
      app.$store.commit('setallLeagueLiveScoreDesk', allLeagueLiveScore)
      app.$store.commit('setallDataStats', that.formatJson(stats.data).r)
      app.$store.commit('setallDataTimeLive', that.formatJson(timeline.data).r)
    }))
  }

  checkLeagueName(allleague, alldata) {
    var league = []
    allleague.forEach(function (x) {
      for (var i = 0; i < alldata.length; i++) {
        if (x == alldata[i][5]) {
          league.push({
            league: alldata[i][5],
            leagueShortName: alldata[i][6],
            leagueColorCode: alldata[i][7],
          })
          break
        }
      }
    })
    return league
  }

  formatJson(data) {
    return JSON.parse(data.replace('callbackJSON(', '').replace(/\)$/g, ''))
  }
}
export default GetData
