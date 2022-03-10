
const pageTitleTemplate = `
	<div>
		<div class="page-title">
			<h1 v-if=" title != '' ">{{ title }}</h1>
			<p v-if=" subTitle && subTitle != '' " class="lead">{{ subTitle }}</p>
			<hr>
			<div v-if=" shortDesc && shortDesc != '' " v-html="shortDesc"></div>
			<hr v-if=" shortDesc && shortDesc != '' ">
		</div>
		
	</div>
`

var PageTitleComponent = Vue.component('page-title', {
	template: pageTitleTemplate,
	props: ['title', 'subTitle', 'shortDesc'],	
})

export {PageTitleComponent}