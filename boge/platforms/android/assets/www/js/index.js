/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


function onreadconfigSuccess(fileEntry) { 
    fileEntry.file(function(file) {
            var reader = new FileReader();
    
            reader.onloadend = function(e) {
                //alert(this.result);
                ljsondata=JSON.parse(this.result);
                user=ljsondata.user;
                pwd = ljsondata.pwd;
                nick = ljsondata.nick;
                expire = ljsondata.expire;
                Ext.getCmp('id_btnlogin').setText(nick);
                Ext.getCmp('id_btnlogin').setDisabled(true);
                Ext.getCmp('id_btnlogin_usercaption').setText(nick);
                Ext.getCmp('id_btnlogin_usercaption').setDisabled(true);
                Ext.getCmp('id_function_menu').getStore().add({id: 4,title: '退出登录',group:'系统',image:'img/message.png'});
            }
            reader.readAsText(file);
        });
}
        
function onreadconfigfail(err) { 
}  

function readconfigSuccess(fileSystem) {
    fileSystem.root.getFile("config.dat", null, onreadconfigSuccess, onreadconfigfail);
}

function readconfig() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, readconfigSuccess, null);
}

function writeconfigFileEntry(fileEntry) {
    fileEntry.createWriter(writeconfigFileWriter, writeconfigfail);
}

function writeconfigfail(error) {
    alert('fail: '+error.code);
}

function writeconfigFileWriter(writer) {
    writer.write('{"expire":'+expire+',"user":"'+user+'","pwd":"'+pwd+'","nick":"'+nick+'"}');
}

function writeconfigSuccess(fileSystem) {
    fileSystem.root.getFile("config.dat", {create: true, exclusive: false}, writeconfigFileEntry, writeconfigfail);
}

// 请求当前持久化的文件系统
function writeconfig() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, writeconfigSuccess, null);
}

//////////////////////////////////删除配置文件
function ondeleteconfigSuccess(fileEntry) {
    fileEntry.remove();
}
        
function ondeleteconfigfail(err) {
    console.log('error delete Config');
}  

function deleteconfigSuccess(fileSystem) {
    fileSystem.root.getFile("config.dat", null, ondeleteconfigSuccess, ondeleteconfigfail);
}

function deleteconfig() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, deleteconfigSuccess, null);
}

//////////////////////////////////删除配置文件


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    		isCordova=true;
    		startapp();
        console.log('Received Event: ' + id);
    }
};

app.initialize();