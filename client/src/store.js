import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    menuMobile: true,
    ishowDetailPredictions: false,
    ishowDetailLivescore: false,
    isActiveSideBar: false,
    activeMenu: 'predictions',
    activeSearch:false,
    openFilter:false,
    allLeague:[],
    allLeagueDesk:[],
    countLeague:0,
    dataPreGame:[],
    dataInplay:[],
    filterTeamName:'',
    leagueSelected:[],
    activeSearchDesk:false,
    isShowLeagueBoxDesk:false,
    dataDetailPre:{
    },
    typePrediction: {
      colorheader: '#767676',
      colorprediction: '#f0f0f0'
    },
    dataLiveScoreLeft:[],
    dataLiveScoreRight:[],
    allLeagueLiveScore:[],
    allLeagueLiveScoreDesk:[],
    leagueSelectedLiveScore:[],
    dataDetailLive:[],
    allDataStats:[],
    allDataTimeLive:[],
    dataStats:[], // only match
    dataTimeLive:[],
    calendarPre: 15,
    calendarLive: 15,
    typeLivescore:{
      bgheader: '#f0f0f0',
      colorheader: '#000',
      bglivescore: '#e3e3e3',
      colorlivescore: '#888888'
    },
    isShowError: false,
    selectDatePre:'',
    loadingPredictions:false,
    isShowClearBt:false,
    typeMatch:'inplay'
  },
  getters: {
    menuMobile(state) {
      return state.menuMobile
    },
    ishowDetailPredictions(state) {
      return state.ishowDetailPredictions
    },
    ishowDetailLivescore(state) {
      return state.ishowDetailLivescore
    },
    isActiveSideBar(state) {
      return state.isActiveSideBar
    },
    activeMenu(state) {
      return state.activeMenu
    },
    activeSearch(state) {
      return state.activeSearch
    },
    openFilter(state) {
      return state.openFilter
    },
    allLeague(state) {
      return state.allLeague
    },
    allLeagueDesk(state) {
      return state.allLeagueDesk
    },
    countLeague(state) {
      return state.countLeague
    },
    dataPreGame(state) {
      return state.dataPreGame
    },
    dataInplay(state) {
      return state.dataInplay
    },
    filterTeamName(state) {
      return state.filterTeamName
    },
    leagueSelected(state) {
      return state.leagueSelected
    },
    activeSearchDesk(state) {
      return state.activeSearchDesk
    },
    isShowLeagueBoxDesk(state) {
      return state.isShowLeagueBoxDesk
    },
    dataDetailPre(state) {
      return state.dataDetailPre
    },
    typePrediction(state) {
      return state.typePrediction
    },
    dataLiveScoreLeft(state) {
      return state.dataLiveScoreLeft
    },
    dataLiveScoreRight(state) {
      return state.dataLiveScoreRight
    },
    allLeagueLiveScore(state) {
      return state.allLeagueLiveScore
    },
    leagueSelectedLiveScore(state){
      return state.leagueSelectedLiveScore
    },
    dataDetailLive(state){
      return state.dataDetailLive
    },
    allDataStats(state){
      return state.allDataStats
    },
    allDataTimeLive(state){
      return state.allDataTimeLive
    },
    dataStats(state){
      return state.dataStats
    },
    dataTimeLive(state){
      return state.dataTimeLive
    },
    calendarPre(state){
      return state.calendarPre
    },
    calendarLive(state){
      return state.calendarLive
    },
    typeLivescore(state){
      return state.typeLivescore
    },
    isShowError(state){
      return state.isShowError
    },
    selectDatePre(state){
      return state.selectDatePre
    },
    loadingPredictions(state){
      return state.loadingPredictions
    },
    allLeagueLiveScoreDesk(state){
      return state.allLeagueLiveScoreDesk
    },
    isShowClearBt(state){
      return state.isShowClearBt
    },
    typeMatch(state){
      return state.typeMatch
    }
  },
  mutations: {
    setmenuMobile(state, val) {
      state.menuMobile = val
    },
    setishowDetailPredictions(state, val) {
      state.ishowDetailPredictions = val
    },
    setishowDetailLivescore(state, val) {
      state.ishowDetailLivescore = val
    },
    setisActiveSideBar(state, val) {
      state.isActiveSideBar = val
    },
    setactiveMenu(state, val) {
      state.activeMenu = val
    },
    setactiveSearch(state, val) {
      state.activeSearch = val
    },
    setopenFilter(state, val) {
      state.openFilter = val
    },
    setallLeague(state, val) {
      state.allLeague = val
    },
    setallLeagueDesk(state, val) {
      state.allLeagueDesk = val
    },
    setcountLeague(state, val) {
      state.countLeague = val
    },
    setdataPreGame(state, val) {
      state.dataPreGame = val
    },
    setdataInplay(state, val) {
      state.dataInplay = val
    },
    setfilterTeamName(state, val) {
      state.filterTeamName = val
    },
    setleagueSelected(state, val) {
      state.leagueSelected = val
    },
    setactiveSearchDesk(state, val) {
      state.activeSearchDesk = val
    },
    setisShowLeagueBoxDesk(state, val) {
      state.isShowLeagueBoxDesk = val
    },
    setdataDetailPre(state, val) {
      state.dataDetailPre = val
    },
    settypePrediction(state, val) {
      state.typePrediction = val
    },
    setdataLiveScoreLeft(state, val) {
      state.dataLiveScoreLeft = val
    },
    setdataLiveScoreRight(state, val) {
      state.dataLiveScoreRight = val
    },
    setallLeagueLiveScore(state, val) {
      state.allLeagueLiveScore = val
    },
    setleagueSelectedLiveScore(state, val) {
      state.leagueSelectedLiveScore = val
    },
    setdataDetailLive(state, val) {
      state.dataDetailLive = val
    },
    setallDataStats(state, val) {
      state.allDataStats = val
    },
    setdataStats(state, val) {
      state.dataStats = val
    },
    setallDataTimeLive(state, val) {
      state.allDataTimeLive = val
    },
    setdataTimeLive(state, val) {
      state.dataTimeLive = val
    },
    setcalendarPre(state, val) {
      state.calendarPre = val
    },
    setcalendarLive(state, val) {
      state.calendarLive = val
    },
    settypeLivescore(state, val) {
      state.typeLivescore = val
    },
    setisShowError(state, val) {
      state.isShowError = val
    },
    setselectDatePre(state, val) {
      state.selectDatePre = val
    },
    setloadingPredictions(state, val) {
      state.loadingPredictions = val
    },
    setallLeagueLiveScoreDesk(state, val) {
      state.allLeagueLiveScoreDesk = val
    },
    setisShowClearBt(state, val) {
      state.isShowClearBt = val
    },
    settypeMatch(state, val) {
      state.typeMatch = val
    }
  },
  actions: {}
})
