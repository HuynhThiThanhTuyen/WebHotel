/*!
 * jPushMenu.js
 * 1.1.1
 * @author: takien
 * http://takien.com
 * Original version (pure JS) is created by Mary Lou http://tympanus.net/
 */
jQuery(document).ready(function($){(function($){$.fn.jPushMenu=function(customOptions){var o=$.extend({},$.fn.jPushMenu.defaultOptions,customOptions);$(this).on("click",function(){$(this).toggleClass('mobile_menu_active');$('.mobile_menu').toggleClass('mobile_menu_open');if($(this).is('.mobile_menu_btn')){$('body').toggleClass('push_mobile')}
$('.jPushMenuBtn').not($(this)).toggleClass('disabled');return!1});var jPushMenu={close:function(o){$('.jPushMenuBtn,body,.mobile_menu_btn,.mobile_menu').removeClass('disabled active mobile_menu_active mobile_menu_open push_mobile')}};if(o.closeOnClickOutside){$(document).on("click",function(){jPushMenu.close()});$(document).on('click touchstart',function(){jPushMenu.close()});$('.mobile_menu,.mobile_menu_btn').on("click",function(){event.stopPropagation()});$('.mobile_menu,.mobile_menu_btn').on('click touchstart',function(e){event.stopPropagation()})}
if(o.closeOnClickLink){$('.mobile_menu a').on('click',function(){jPushMenu.close()})}};$.fn.jPushMenu.defaultOptions={closeOnClickOutside:!0,closeOnClickInside:!0,closeOnClickLink:!1}})(jQuery);(function($){function viewportToPixel(val){var percent=val.match(/\d+/)[0]/100,unit=val.match(/[vwh]+/)[0];return(unit=='vh'?$(window).height()*percent:$(window).width()*percent)+'px'}
function parseProps(props){var p,prop;for(p in props){prop=props[p];if(/[vwh]$/.test(prop)){props[p]=viewportToPixel(prop)}}
return props}
$.fn.v2p=function(props){return this.css(parseProps(props))}}(jQuery));$(window).resize(function(){$('.cbp-spmenu').v2p({height:'100vh'})});$(window).resize()})