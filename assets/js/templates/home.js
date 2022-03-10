const homeTemplate = `
<div>
    <page-title :title="siteinfo.title" :subTitle="siteinfo.caption" :shortDesc="siteinfo.description"></page-title>
    <landing-page :siteid="siteid" :siteinfo="siteinfo"></landing-page>     
</div>
`

export {homeTemplate}