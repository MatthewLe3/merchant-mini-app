<script>
import { ENV } from './config'

	export default {
		onLaunch: function() {
			console.log('App Launch')
			wx.cloud.init({
				env:ENV,
				traceUser:true
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	Page{
		height: 100%;
		background-color: #F8F8F8;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
</style>
