import Vue from 'vue';
import Router from 'vue-router';
import index from 'view/index';
import extension from 'view/extension';
import groupNumber from 'view/groupNumber';
import notFound from 'view/notFound';
import register from 'view/register';
import downloadGame from 'view/downloadGame';
import comment from 'view/comment';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		name: 'index',
		component: index
	}, {
		path: '/extension',
		name: 'extension',
		component: extension
	}, {
		path: '/groupNumber',
		name: 'groupNumber',
		component: groupNumber
	}, {
		path: '/register',
		name: 'register',
		component: register
	}, {
		path: '/downloadGame',
		name: 'downloadGame',
		component: downloadGame
	}, {
		path: '/comment',
		name: 'comment',
		component: comment
	}, {
		path: '/404',
		name: '404',
		component: notFound
	}, {
		path: '*',
		redirect: '/404'
	}]
});
