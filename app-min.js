var app=angular.module("wikibility",["ngRoute"]);app.config(function($routeProvider,$locationProvider){$routeProvider.when("/",{templateUrl:"home.html",controller:"homeCtrl"}).when("/wiki/:slug",{templateUrl:"article.html",controller:"articleCtrl"}),$locationProvider.html5Mode(!0)}),app.factory("wikiService",function($http,$sce){var wikiService={query:function(params){var url="https://en.wikipedia.org/w/api.php?action=parse&prop=text&page="+params.q+"&format=json&section="+params.section,trustedUrl=$sce.trustAsResourceUrl(url);return $http.jsonp(trustedUrl,{jsonpCallbackParam:"callback"})},article:function(params){var url="https://en.wikipedia.org/w/api.php?action=parse&prop=text&page="+params.q+"&format=json",trustedUrl=$sce.trustAsResourceUrl(url);return $http.jsonp(trustedUrl,{jsonpCallbackParam:"callback"})},search:function(params){var url="https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+params.q+"&utf8=&format=json",trustedUrl=$sce.trustAsResourceUrl(url);return $http.jsonp(trustedUrl,{jsonpCallbackParam:"callback"})}};return wikiService}),app.controller("homeCtrl",function($scope,$location,wikiService){$scope.searchArticle=function(){$location.path("/wiki/"+$scope.searchModel.replace(/ /g,"_"))},$scope.searchWiki=function(){void 0!==$scope.searchModel&&wikiService.search({q:$scope.searchModel,section:0}).then(function(wikiData){$scope.searchResults=wikiData.data.query.search})}}),app.controller("articleCtrl",function($scope,$routeParams,$sce,wikiService,$timeout,$location){document.getElementById("paradeiser-dropdown").addEventListener("click",function(event){event.preventDefault(),document.getElementById("paradeiser-more").classList.toggle("open")}),document.getElementById("greybox").addEventListener("click",function(event){event.preventDefault(),document.getElementById("paradeiser-more").classList.remove("open")});var myElement=document.querySelector(".paradeiser"),headroom=new Headroom(myElement,{tolerance:5,onUnpin:function(){document.getElementById("paradeiser-more").classList.remove("open")}});headroom.init(),wikiService.query({q:$routeParams.slug,section:0}).then(function(wikiData){wikiService.article({q:$routeParams.slug}).then(function(wikiData){var p=wikiData.data.parse.text["*"].split('<div id="toc" class="toc">')[1];$scope.sections=$sce.trustAsHtml(p),$timeout(function(){angular.element("#redirectMsg")&&$location.path(angular.element(".redirectText a").attr("href")),smartquotes();var g=0;angular.element("sup").each(function(){g++,$(this).find("a").html(g),$(this).find("a").attr("href","#cite_note-"+g),$(this).mouseover(function(){$(".ref-tooltip").fadeIn(200),$(".ref-tooltip").css("left",$(this).offset().left+"px"),$(".ref-tooltip").css("top",$(this).offset().top+25+"px"),$(".ref-tooltip").html(angular.element($(this).find("a").attr("href")).html())}),$(this).mouseout(function(){$(".ref-tooltip").fadeOut(200)})}),angular.element("a").each(function(){var a=new RegExp("/"+window.location.host+"/");a.test(this.href)||$(this).attr("target","_blank")})},1)}),$scope.wikiTitle=wikiData.data.parse.title,$scope.wikiData=$sce.trustAsHtml(wikiData.data.parse.text["*"]),$timeout(function(){smartquotes(),angular.element("sup").each(function(){$(this).find("a").html("")})},1)})}),app.filter("wikipediafy",function(){return function(str){return str.replace(/ /g,"_")}});
//# sourceMappingURL=./app-min.js.map