var gBaseItems=null;
var gAdvItems = null;

var BaseHtml = ['viewport.html','panel.html','list.html','picker.html','inputfield.html','msg.html','mask.html','ajax.html'];
var AdvHtml = ['event.html','animation.html','multilang.html','rotate.html','popwin.html','iosstatus.html'];
var BaseTitle = ['Viewport使用','Panel/Container使用','List/DataView使用','Picker使用','InputField使用','Ext.Msg的使用','LoadMask使用','Ajax使用'];
var AdvTitle = ['一些共性事件/属性/方法','动画处理','多语言处理','屏幕旋转的处理','弹出窗口的显示','iOS的状态栏处理'];

function GetItems(html,title)
{
	rt = new Array;
	for (var i = 0; i < html.length; i++) {
		rt[i]= {
			xtype:'button',
			text: title[i],
			selfurl: html[i],
			top: 10+50*i,
			left: 20,
			width: Ext.os.is.Phone? window.innerWidth-40 : 280,
			height: 35,
			style: 'background-color:#00d6a5',
			handler: function() {
				window.location.href= this.config.selfurl;
			}
		}
	};
	return rt;
}

function startapp()
{
	gBaseItems = GetItems(BaseHtml,BaseTitle);
	gAdvItems  = GetItems(AdvHtml,AdvTitle);
	Ext.application({
	    name: 'corsee',

	    launch: function() {
	    	var config={
	    		//fullscreen: true,
	    		tabBarPosition: 'bottom',
	    		tabBar: {
	    			defaults: {
	    			              flex: 1
	    			          },
	                dock: 'bottom',
	                layout: {
	                    pack: 'center'
	                }
	    		},
	    		items: [
	    			{
	    				title: '基本控件使用',
	    				iconCls: 'home',
	    				items: [
	    					{
	    						xtype: 'container',
	    						width: '100%',
	    						height: '100%',
	    						items: gBaseItems
	    					}
	    				]
	    			},
	    			{
	    				title: '高级应用技巧',
	    				iconCls: 'info',
	    				items: [
	    					{
	    						xtype: 'container',
	    						width: '100%',
	    						height: '100%',
	    						items: gAdvItems
	    					}
	    				]
	    			}
	    		]
	    	};
	    	if(Ext.os.is.Phone)
	    		Ext.apply(config,{fullscreen: true});
	    	else
	    		Ext.apply(config,{width: 320,height: 576,centered: true,modal: true});
	    	var frmmain = Ext.create('Ext.tab.Panel',config);
	    	Ext.Viewport.add(frmmain);
		},
	});
}
