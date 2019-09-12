webpackJsonp([5],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoadingProvider = /** @class */ (function () {
    function LoadingProvider(loadingController) {
        this.loadingController = loadingController;
        // Loading Provider
        // This is the provider class for most of the loading spinners screens on the app.
        // Set your spinner/loading indicator type here
        // List of Spinners: https://ionicframework.com/docs/v2/api/components/spinner/Spinner/
        this.spinner = {
            spinner: 'circles'
        };
    }
    //Show loading
    LoadingProvider.prototype.show = function () {
        if (!this.loading) {
            this.loading = this.loadingController.create(this.spinner);
            this.loading.present();
        }
    };
    //Hide loading
    LoadingProvider.prototype.hide = function () {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    };
    LoadingProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], LoadingProvider);
    return LoadingProvider;
}());

//# sourceMappingURL=loading.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messages_messages__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__groups_groups__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__friends_friends__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__timeline_timeline__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_badge__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TabsPage = /** @class */ (function () {
    // TabsPage
    // This is the page where we set our tabs.
    function TabsPage(navCtrl, navParams, dataProvider, badge) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.badge = badge;
        this.messages = __WEBPACK_IMPORTED_MODULE_3__messages_messages__["a" /* MessagesPage */];
        this.groups = __WEBPACK_IMPORTED_MODULE_4__groups_groups__["a" /* GroupsPage */];
        this.friends = __WEBPACK_IMPORTED_MODULE_5__friends_friends__["a" /* FriendsPage */];
        this.profile = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.timeline = __WEBPACK_IMPORTED_MODULE_7__timeline_timeline__["a" /* TimelinePage */];
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Get friend requests count.
        this.dataProvider.getRequests(__WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid).subscribe(function (requests) {
            if (requests.friendRequests) {
                _this.friendRequestCount = requests.friendRequests.length;
            }
            else {
                _this.friendRequestCount = null;
            }
            _this.setBadgeCount();
        });
        // Get conversations and add/update if the conversation exists, otherwise delete from list.
        this.dataProvider.getConversations().subscribe(function (conversationsInfo) {
            _this.unreadMessagesCount = null;
            _this.conversationsInfo = null;
            _this.conversationList = null;
            if (conversationsInfo.length > 0) {
                _this.conversationsInfo = conversationsInfo;
                conversationsInfo.forEach(function (conversationInfo) {
                    _this.dataProvider.getConversation(conversationInfo.conversationId).subscribe(function (conversation) {
                        if (conversation.$exists()) {
                            _this.addOrUpdateConversation(conversation);
                        }
                    });
                });
            }
        });
        this.dataProvider.getGroups().subscribe(function (groupIds) {
            if (groupIds.length > 0) {
                _this.groupsInfo = groupIds;
                if (_this.groupList && _this.groupList.length > groupIds.length) {
                    // User left/deleted a group, clear the list and add or update each group again.
                    _this.groupList = null;
                }
                groupIds.forEach(function (groupId) {
                    _this.dataProvider.getGroup(groupId.$key).subscribe(function (group) {
                        if (group.$exists()) {
                            _this.addOrUpdateGroup(group);
                        }
                    });
                });
            }
            else {
                _this.unreadGroupMessagesCount = null;
                _this.groupsInfo = null;
                _this.groupList = null;
            }
        });
    };
    // Add or update conversaion for real-time sync of unreadMessagesCount.
    TabsPage.prototype.addOrUpdateConversation = function (conversation) {
        if (!this.conversationList) {
            this.conversationList = [conversation];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.conversationList.length; i++) {
                if (this.conversationList[i].$key == conversation.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.conversationList[index] = conversation;
            }
            else {
                this.conversationList.push(conversation);
            }
        }
        this.computeUnreadMessagesCount();
    };
    // Compute all conversation's unreadMessages.
    TabsPage.prototype.computeUnreadMessagesCount = function () {
        this.unreadMessagesCount = 0;
        if (this.conversationList) {
            for (var i = 0; i < this.conversationList.length; i++) {
                this.unreadMessagesCount += this.conversationList[i].messages.length - this.conversationsInfo[i].messagesRead;
                if (this.unreadMessagesCount == 0) {
                    this.unreadMessagesCount = null;
                }
                this.setBadgeCount();
            }
        }
    };
    TabsPage.prototype.getUnreadMessagesCount = function () {
        if (this.unreadMessagesCount) {
            if (this.unreadMessagesCount > 0) {
                return this.unreadMessagesCount;
            }
        }
        return null;
    };
    // Compute all group's unreadMessages.
    TabsPage.prototype.computeUnreadGroupMessagesCount = function () {
        this.unreadGroupMessagesCount = 0;
        if (this.groupList) {
            for (var i = 0; i < this.groupList.length; i++) {
                if (this.groupList[i].messages) {
                    this.unreadGroupMessagesCount += this.groupList[i].messages.length - this.groupsInfo[i].messagesRead;
                }
                if (this.unreadGroupMessagesCount == 0) {
                    this.unreadGroupMessagesCount = null;
                }
                this.setBadgeCount();
            }
        }
    };
    TabsPage.prototype.getUnreadGroupMessagesCount = function () {
        if (this.unreadGroupMessagesCount) {
            if (this.unreadGroupMessagesCount > 0) {
                return this.unreadGroupMessagesCount;
            }
        }
        return null;
    };
    // Add or update group
    TabsPage.prototype.addOrUpdateGroup = function (group) {
        if (!this.groupList) {
            this.groupList = [group];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.groupList.length; i++) {
                if (this.groupList[i].$key == group.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.groupList[index] = group;
            }
            else {
                this.groupList.push(group);
            }
        }
        this.computeUnreadGroupMessagesCount();
    };
    // Remove group from list if group is already deleted.
    TabsPage.prototype.removeGroup = function (groupId) {
        if (this.groupList) {
            var index = -1;
            for (var i = 0; i < this.groupList.length; i++) {
                if (this.groupList[i].$key == groupId) {
                    index = i;
                }
            }
            if (index > -1) {
                this.groupList.splice(index, 1);
            }
            index = -1;
            for (var i = 0; i < this.groupsInfo.length; i++) {
                if (this.groupsInfo[i].$key == groupId) {
                    index = i;
                }
            }
            if (index > -1) {
                this.groupsInfo.splice(index, 1);
            }
            this.computeUnreadGroupMessagesCount();
        }
    };
    TabsPage.prototype.setBadgeCount = function () {
        var count = 0;
        if (this.unreadGroupMessagesCount > 0) {
            count = +count + this.unreadGroupMessagesCount;
        }
        if (this.unreadMessagesCount > 0) {
            count = +count + this.unreadMessagesCount;
        }
        if (this.friendRequestCount > 0) {
            count = +count + this.friendRequestCount;
        }
        // if(this.getUnreadMessagesCount()){
        //   count = +count+this.getUnreadMessagesCount()
        // }
        // if(this.getUnreadGroupMessagesCount()){
        //   count= +count+this.getUnreadGroupMessagesCount();
        // }
        this.badge.set(count);
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/tabs/tabs.html"*/'<ion-tabs selectedIndex="0">\n  <ion-tab [root]="timeline" tabIcon="md-home" tabBadgeStyle="danger" ></ion-tab>\n  <ion-tab [root]="messages" tabIcon="md-text" tabBadgeStyle="danger" tabBadge="{{getUnreadMessagesCount()}}"></ion-tab>\n  <ion-tab [root]="groups" tabIcon="md-chatbubbles" tabBadgeStyle="danger" tabBadge="{{getUnreadGroupMessagesCount()}}"></ion-tab>\n  <ion-tab [root]="friends" tabIcon="md-contacts" tabBadgeStyle="danger" tabBadge="{{friendRequestCount}}"></ion-tab>\n  <ion-tab [root]="profile" tabIcon="md-contact"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_badge__["a" /* Badge */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_image__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_info_user_info__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__group_info_group_info__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__image_modal_image_modal__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_keyboard__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_social_sharing__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_lodash__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_audio__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_media_capture__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


















var GroupPage = /** @class */ (function () {
    // GroupPage
    // This is the page where the user can chat with other group members and view group info.
    function GroupPage(navCtrl, navParams, dataProvider, modalCtrl, angularfire, angularDb, alertCtrl, imageProvider, loadingProvider, camera, keyboard, socialSharing, actionSheetCtrl, _audioProvider, mediaCapture, file) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.modalCtrl = modalCtrl;
        this.angularfire = angularfire;
        this.angularDb = angularDb;
        this.alertCtrl = alertCtrl;
        this.imageProvider = imageProvider;
        this.loadingProvider = loadingProvider;
        this.camera = camera;
        this.keyboard = keyboard;
        this.socialSharing = socialSharing;
        this.actionSheetCtrl = actionSheetCtrl;
        this._audioProvider = _audioProvider;
        this.mediaCapture = mediaCapture;
        this.file = file;
        this.startIndex = -1;
        this.scrollDirection = 'bottom';
        // Set number of messages to show.
        this.numberOfMessages = 10;
        this.myTracks = [{
                src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
            },
            {
                src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
            }];
    }
    GroupPage_1 = GroupPage;
    GroupPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Get group details
        this.groupId = this.navParams.get('groupId');
        this.userId = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid;
        this.subscription = this.dataProvider.getGroup(this.groupId).subscribe(function (group) {
            if (group.$exists()) {
                if (group.admin) {
                    var index = __WEBPACK_IMPORTED_MODULE_14_lodash___default.a.indexOf(group.admin, __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid);
                    if (index > -1) {
                        _this.isAdmin = true;
                    }
                }
                _this.title = group.name;
                // Get group messages
                _this.dataProvider.getGroupMessages(group.$key).subscribe(function (messages) {
                    if (_this.messages) {
                        // Just append newly added messages to the bottom of the view.
                        if (messages.length > _this.messages.length) {
                            var message_1 = messages[messages.length - 1];
                            _this.dataProvider.getUser(message_1.sender).subscribe(function (user) {
                                message_1.avatar = user.img;
                                message_1.name = user.name;
                            });
                            _this.messages.push(message_1);
                            // Also append to messagesToShow.
                            _this.messagesToShow.push(message_1);
                            // Reset scrollDirection to bottom.
                            _this.scrollDirection = 'bottom';
                        }
                    }
                    else {
                        // Get all messages, this will be used as reference object for messagesToShow.
                        _this.messages = [];
                        messages.forEach(function (message) {
                            _this.dataProvider.getUser(message.sender).subscribe(function (user) {
                                message.avatar = user.img;
                                message.name = user.name;
                            });
                            _this.messages.push(message);
                        });
                        // Load messages in relation to numOfMessages.
                        if (_this.startIndex == -1) {
                            // Get initial index for numberOfMessages to show.
                            if ((_this.messages.length - _this.numberOfMessages) > 0) {
                                _this.startIndex = _this.messages.length - _this.numberOfMessages;
                            }
                            else {
                                _this.startIndex = 0;
                            }
                        }
                        if (!_this.messagesToShow) {
                            _this.messagesToShow = [];
                        }
                        // Set messagesToShow
                        for (var i = _this.startIndex; i < _this.messages.length; i++) {
                            _this.messagesToShow.push(_this.messages[i]);
                        }
                        _this.loadingProvider.hide();
                    }
                });
            }
        });
        // Update messages' date time elapsed every minute based on Moment.js.
        var that = this;
        if (!that.updateDateTime) {
            that.updateDateTime = setInterval(function () {
                if (that.messages) {
                    that.messages.forEach(function (message) {
                        var date = message.date;
                        message.date = new Date(date);
                    });
                }
            }, 60000);
        }
    };
    // Load previous messages in relation to numberOfMessages.
    GroupPage.prototype.loadPreviousMessages = function () {
        var that = this;
        // Show loading.
        this.loadingProvider.show();
        setTimeout(function () {
            // Set startIndex to load more messages.
            if (that.startIndex - that.numberOfMessages > -1) {
                that.startIndex -= that.numberOfMessages;
            }
            else {
                that.startIndex = 0;
            }
            // Refresh our messages list. that.messages = null;
            that.messagesToShow = null;
            // Set scroll direction to top.
            that.scrollDirection = 'top';
            // Populate list again.
            that.ionViewDidLoad();
        }, 1000);
    };
    // Update messagesRead when user lefts this page.
    GroupPage.prototype.ionViewWillLeave = function () {
        if (this.messages)
            this.setMessagesRead(this.messages);
    };
    GroupPage.prototype.share = function (message, index) {
        var _this = this;
        if (this.isAdmin) {
            var actionSheet = this.actionSheetCtrl.create({
                title: 'Message',
                buttons: [
                    {
                        text: 'Share',
                        role: 'share',
                        handler: function () {
                            // share message
                            // Check if sharing via email is supported
                            if (message.type == 'text') {
                                _this.socialSharing.share(message.message, "", "", "").then(function () {
                                    // Sharing via email is possible
                                }).catch(function () {
                                    // Sharing via email is not possible
                                });
                            }
                            else {
                                _this.socialSharing.share(message.message, "Communicater Share", message.url.toString(), message.url).then(function () {
                                    // Sharing via email is possible
                                }).catch(function () {
                                    // Sharing via email is not possible
                                });
                            }
                        }
                    },
                    {
                        text: 'Delete',
                        role: 'delete',
                        handler: function () {
                            // share message
                            var messages = JSON.parse(JSON.stringify(_this.messages));
                            messages.splice(index, 1);
                            // Update group messages.
                            _this.dataProvider.getGroup(_this.groupId).update({
                                messages: messages
                            });
                            _this.messagesToShow.splice(index, 1);
                            // Clear messagebox.
                            _this.message = '';
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                        }
                    }
                ]
            });
            actionSheet.present();
        }
        else {
            var actionSheet = this.actionSheetCtrl.create({
                title: 'Share Message',
                buttons: [
                    {
                        text: 'Share',
                        role: 'share',
                        handler: function () {
                            // share message
                            // Check if sharing via email is supported
                            if (message.type == 'text') {
                                _this.socialSharing.share(message.message, "", "", "").then(function () {
                                    // Sharing via email is possible
                                }).catch(function () {
                                    // Sharing via email is not possible
                                });
                            }
                            else {
                                _this.socialSharing.share(message.message, "", message.url, "").then(function () {
                                    // Sharing via email is possible
                                }).catch(function () {
                                    // Sharing via email is not possible
                                });
                            }
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                        }
                    }
                ]
            });
            actionSheet.present();
        }
    };
    // Check if currentPage is active, then update user's messagesRead.
    GroupPage.prototype.setMessagesRead = function (messages) {
        if (this.navCtrl.getActive().instance instanceof GroupPage_1) {
            // Update user's messagesRead on database.
            this.angularDb.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid + '/groups/' + this.groupId).update({
                messagesRead: this.messages.length
            });
        }
    };
    // Check if 'return' button is pressed and send the message.
    GroupPage.prototype.onType = function (keyCode) {
        if (keyCode == 13) {
            this.keyboard.hide();
            this.send();
        }
    };
    // Back
    GroupPage.prototype.back = function () {
        this.subscription.unsubscribe();
        this.navCtrl.pop();
    };
    // Scroll to bottom of page after a short delay.
    GroupPage.prototype.scrollBottom = function () {
        var that = this;
        setTimeout(function () {
            that.content.scrollToBottom();
        }, 300);
    };
    // Scroll to top of the page after a short delay.
    GroupPage.prototype.scrollTop = function () {
        var that = this;
        setTimeout(function () {
            that.content.scrollToTop();
        }, 300);
    };
    // Scroll depending on the direction.
    GroupPage.prototype.doScroll = function () {
        if (this.scrollDirection == 'bottom') {
            this.scrollBottom();
        }
        else if (this.scrollDirection == 'top') {
            this.scrollTop();
        }
    };
    // Check if the user is the sender of the message.
    GroupPage.prototype.isSender = function (message) {
        if (message.sender == __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid) {
            return true;
        }
        else {
            return false;
        }
    };
    // Check if the message is a system message.
    GroupPage.prototype.isSystemMessage = function (message) {
        if (message.type == 'system') {
            return true;
        }
        else {
            return false;
        }
    };
    // View user info
    GroupPage.prototype.viewUser = function (userId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__user_info_user_info__["a" /* UserInfoPage */], { userId: userId });
    };
    // Send text message to the group.
    GroupPage.prototype.send = function () {
        // Clone an instance of messages object so it will not directly be updated.
        // The messages object should be updated by our observer declared on ionViewDidLoad.
        var messages = JSON.parse(JSON.stringify(this.messages));
        messages.push({
            date: new Date().toString(),
            sender: __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid,
            type: 'text',
            message: this.message
        });
        // Update group messages.
        this.dataProvider.getGroup(this.groupId).update({
            messages: messages
        });
        // Clear messagebox.
        this.message = '';
    };
    // Enlarge image messages.
    GroupPage.prototype.enlargeImage = function (img) {
        var imageModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__image_modal_image_modal__["a" /* ImageModalPage */], { img: img });
        imageModal.present();
    };
    // Send photoMessage.
    GroupPage.prototype.sendPhoto = function () {
        var _this = this;
        // Ask user if they want to take photo or choose from gallery.
        this.alert = this.alertCtrl.create({
            title: 'Send Photo Message',
            message: 'Do you want to take a photo or choose from your photo gallery?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Choose from Gallery',
                    handler: function () {
                        // Upload the image and return promise.
                        _this.imageProvider.uploadGroupPhotoMessage(_this.groupId, _this.camera.PictureSourceType.PHOTOLIBRARY).then(function (url) {
                            // Process photoMessage on database.
                            _this.sendPhotoMessage(url);
                        });
                    }
                },
                {
                    text: 'Take Photo',
                    handler: function () {
                        // Upload the image and return promise.
                        _this.imageProvider.uploadGroupPhotoMessage(_this.groupId, _this.camera.PictureSourceType.CAMERA).then(function (url) {
                            // Process photoMessage on database.
                            _this.sendPhotoMessage(url);
                        });
                    }
                }
            ]
        }).present();
    };
    // Process photoMessage on database.
    GroupPage.prototype.sendPhotoMessage = function (url) {
        var messages = JSON.parse(JSON.stringify(this.messages));
        messages.push({
            date: new Date().toString(),
            sender: __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid,
            type: 'image',
            url: url
        });
        this.dataProvider.getGroup(this.groupId).update({
            messages: messages
        });
        this.message = '';
    };
    // View group info.
    GroupPage.prototype.groupInfo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__group_info_group_info__["a" /* GroupInfoPage */], { groupId: this.groupId });
    };
    GroupPage.prototype.audioRec = function () {
        var _this = this;
        var options = { limit: 1 };
        this.mediaCapture.captureAudio(options)
            .then(function (data) {
            _this.updateAudioFile(data[0]);
        }, function (err) {
        });
    };
    GroupPage.prototype.updateAudioFile = function (data) {
        var _this = this;
        var path = data.localURL.substr(0, data.localURL.lastIndexOf('/')) + '/';
        this.file.readAsArrayBuffer(path, data.name)
            .then(function (success) {
            var audioBlob = new Blob([success], {
                type: "audio/amr"
            });
            var metadata = {
                'contentType': 'audio/amr'
            };
            // Generate filename and upload to Firebase Storage.
            __WEBPACK_IMPORTED_MODULE_5_firebase__["storage"]().ref().child('audio/' + _this.userId + _this.generateAudioname()).put(audioBlob, metadata).then(function (snapshot) {
                var url = snapshot.metadata.downloadURLs[0];
                _this.sendAudioMessage(url);
            }, function (error) {
                //alert('err'+error)
            });
        }, function (error) {
        });
    };
    // Process photoMessage on database.
    GroupPage.prototype.sendAudioMessage = function (url) {
        var messages = JSON.parse(JSON.stringify(this.messages));
        messages.push({
            date: new Date().toString(),
            sender: __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid,
            type: 'audio',
            src: url
        });
        // Update group messages.
        this.dataProvider.getGroup(this.groupId).update({
            messages: messages
        });
    };
    GroupPage.prototype.playSelectedTrack = function () {
        // use AudioProvider to control selected track
        this._audioProvider.play(this.selectedTrack);
    };
    GroupPage.prototype.pauseSelectedTrack = function () {
        // use AudioProvider to control selected track
        this._audioProvider.pause(this.selectedTrack);
    };
    GroupPage.prototype.onTrackFinished = function (track) {
    };
    // Generate a random filename of length for the image to be uploaded
    GroupPage.prototype.generateAudioname = function () {
        var length = 8;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text + ".amr";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], GroupPage.prototype, "content", void 0);
    GroupPage = GroupPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-group',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/group/group.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <ion-buttons>\n      <button ion-button tappable (click)="back()">Back</button>\n    </ion-buttons>\n    <ion-title tappable (click)="groupInfo()">{{title}}</ion-title>\n    <!-- View Group Info -->\n    <ion-buttons end>\n      <button ion-button icon-only tappable (click)="groupInfo()"><ion-icon name="ios-more"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content has-footer>\n  <!-- Messages -->\n  <div class="messages">\n    <p class="center" *ngIf="startIndex > 0"><span tappable (click)="loadPreviousMessages()">Load previous messages</span></p>\n    <ion-row *ngFor="let message of messagesToShow; let i = index">\n      <!--  System Message -->\n      <ion-col col-12 class="system" *ngIf="isSystemMessage(message)">\n        <p>\n          <ion-icon name="{{message.icon}}"></ion-icon>\n          {{message.message}} <br/>\n          <span >{{message.date | DateFormat}}</span>\n        </p>\n      </ion-col>\n      <!--  Message -->\n      <ion-col col-2 class="center" *ngIf="isSender(message) && !isSystemMessage(message)">\n        <img src="{{message.avatar}}" (load)="doScroll()"/>\n      </ion-col>\n      <ion-col col-1 *ngIf="!isSender(message) && !isSystemMessage(message)">\n      </ion-col>\n      <ion-col col-9 class="sender" *ngIf="isSender(message) && !isSystemMessage(message)" (press)="share(message,i)">\n        <div class="left" *ngIf="message.type == \'text\'">\n          <p>\n            {{message.message}}<br/>\n              <span>{{message.date | DateFormat}}</span>\n          </p>\n          \n        </div>\n         <div class="left" *ngIf="message.type == \'audio\'">\n         <p>\n             <audio-track #audio  [track]="message" (onFinish)="onTrackFinished($event)">\n              <ion-item>  \n                <ion-thumbnail item-left>\n                  <audio-track-play dark [audioTrack]="audio"><ion-spinner></ion-spinner></audio-track-play>  \n                </ion-thumbnail>\n                <div item-content style="width:100%">\n                  <audio-track-progress-bar dark duration progress [audioTrack]="audio" [ngStyle]="{visibility: audio.completed > 0 ? \'visible\' : \'hidden\'}"></audio-track-progress-bar>\n                </div>\n              </ion-item>    \n            </audio-track>\n             <span>{{message.date | DateFormat}}</span>\n          </p>\n          \n        </div>\n\n        <div class="left" *ngIf="message.type == \'image\'">\n       <p>\n          <img tappable (click)="enlargeImage(message.url)" src="{{message.url}}" (load)="doScroll()"/>\n          <span>{{message.date | DateFormat}}</span>\n         </p>\n        </div>\n      </ion-col>\n      <ion-col col-9 *ngIf="!isSender(message) && !isSystemMessage(message)"  (press)="share(message,i)">\n        <div class="right" *ngIf="message.type == \'text\'">\n          <p>{{message.name}} <br>\n          {{message.message}} \n              <span>{{message.date | DateFormat}}</span>\n          </p>\n          \n        </div>\n        <div class="left" *ngIf="message.type == \'image\'">\n          <p>\n          <img tappable (click)="enlargeImage(message.url)" src="{{message.url}}" (load)="doScroll()"/>\n          <span>{{message.date | DateFormat}}</span>\n          </p>\n        </div>\n      </ion-col>\n      <ion-col col-1 *ngIf="isSender(message) && !isSystemMessage(message)">\n      </ion-col>\n      <ion-col col-2 class="center" *ngIf="!isSender(message) && !isSystemMessage(message)">\n        <img src="{{message.avatar}}" tappable (click)="viewUser(message.sender)" (load)="doScroll()"/>\n      </ion-col>\n    </ion-row>\n  </div>\n</ion-content>\n<!-- Message Box -->\n<ion-footer>\n    <ion-grid class="bottom_bar">\n        <ion-row>\n          <ion-col>\n              <ion-fab middle left >\n                  <ion-buttons style="margin-top:13px">\n                  <button mini tappable (click)="sendPhoto()"><ion-icon name="md-camera"></ion-icon></button>\n                  </ion-buttons>\n                </ion-fab>\n          </ion-col>\n          <ion-col>\n              <ion-fab middle left >\n                  <ion-buttons style="margin-top:13px">\n                  <button mini tappable (press)="audioRec()"><ion-icon name="md-mic"></ion-icon></button>\n                  </ion-buttons>\n                </ion-fab>\n          </ion-col>\n          <ion-col col-8>\n              <ion-textarea style="color: white" placeholder="Type your message" [(ngModel)]="message" (focus)="scrollBottom()" (keypress)="onType($event.keyCode)"></ion-textarea>\n          </ion-col>\n          <ion-col>\n              <ion-fab middle right style="position: absolute; right: 0 ;">\n                  <button ion-fab mini tappable (click)="send()" [disabled]="!message"><ion-icon name="md-send"></ion-icon></button>\n                </ion-fab>\n          </ion-col>\n        </ion-row>\n       \n    </ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/group/group.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_9_angularfire2__["a" /* AngularFireModule */], __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_15_ionic_audio__["a" /* AudioProvider */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_media_capture__["a" /* MediaCapture */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__["a" /* File */]])
    ], GroupPage);
    return GroupPage;
    var GroupPage_1;
}());

//# sourceMappingURL=group.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validator__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logout__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(238);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var errorMessages = {
    // Alert Provider
    // This is the provider class for most of the success and error messages in the app.
    // If you added your own messages don't forget to make a function for them or add them in the showErrorMessage switch block.
    // Firebase Error Messages
    accountExistsWithDifferentCredential: {
        title: "Account Exists!",
        subTitle: "An account with the same credential already exists."
    },
    invalidCredential: {
        title: "Invalid Credential!",
        subTitle: "An error occured logging in with this credential."
    },
    operationNotAllowed: {
        title: "Login Failed!",
        subTitle: "Logging in with this provider is not allowed! Please contact support."
    },
    userDisabled: {
        title: "Account Disabled!",
        subTitle: "Sorry! But this account has been suspended! Please contact support."
    },
    userNotFound: {
        title: "Account Not Found!",
        subTitle: "Sorry, but an account with this credential could not be found."
    },
    wrongPassword: {
        title: "Incorrect Password!",
        subTitle: "Sorry, but the password you have entered is incorrect."
    },
    invalidEmail: {
        title: "Invalid Email!",
        subTitle: "Sorry, but you have entered an invalid email address."
    },
    emailAlreadyInUse: {
        title: "Email Not Available!",
        subTitle: "Sorry, but this email is already in use."
    },
    weakPassword: {
        title: "Weak Password!",
        subTitle: "Sorry, but you have entered a weak password."
    },
    requiresRecentLogin: {
        title: "Credential Expired!",
        subTitle: "Sorry, but this credential has expired! Please login again."
    },
    userMismatch: {
        title: "User Mismatch!",
        subTitle: "Sorry, but this credential is for another user!"
    },
    providerAlreadyLinked: {
        title: "Already Linked!",
        subTitle: "Sorry, but your account is already linked to this credential."
    },
    credentialAlreadyInUse: {
        title: "Credential Not Available!",
        subTitle: "Sorry, but this credential is already used by another user."
    },
    // Profile Error Messages
    changeName: {
        title: "Change Name Failed!",
        subTitle: "Sorry, but we've encountered an error changing your name."
    },
    invalidCharsName: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profileNameValidator.patternError,
    nameTooShort: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profileNameValidator.lengthError,
    changeEmail: {
        title: "Change Email Failed!",
        subTitle: "Sorry, but we've encountered an error changing your email address."
    },
    invalidProfileEmail: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profileEmailValidator.patternError,
    changePhoto: {
        title: "Change Photo Failed!",
        subTitle: "Sorry, but we've encountered an error changing your photo."
    },
    passwordTooShort: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profilePasswordValidator.lengthError,
    invalidCharsPassword: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profilePasswordValidator.patternError,
    passwordsDoNotMatch: {
        title: "Change Password Failed!",
        subTitle: "Sorry, but the passwords you entered do not match."
    },
    updateProfile: {
        title: "Update Profile Failed",
        subTitle: "Sorry, but we've encountered an error updating your profile."
    },
    usernameExists: {
        title: "Username Already Exists!",
        subTitle: "Sorry, but this username is already taken by another user."
    },
    phoneNumberExists: {
        title: "Phone Number Already Exists!",
        subTitle: "Sorry, but this phone number is already taken by another user."
    },
    // Image Error Messages
    imageUpload: {
        title: "Image Upload Failed!",
        subTitle: "Sorry but we've encountered an error uploading selected image."
    },
    // Group Error Messages
    groupUpdate: {
        title: "Update Group Failed!",
        subTitle: "Sorry, but we've encountered an error updating this group."
    },
    groupLeave: {
        title: "Leave Group Failed!",
        subTitle: "Sorry, but you've encountered an error leaving this group."
    },
    groupDelete: {
        title: "Delete Group Failed!",
        subTitle: "Sorry, but we've encountered an error deleting this group."
    }
};
var successMessages = {
    passwordResetSent: {
        title: "Password Reset Sent!",
        subTitle: "A password reset email has been sent to: "
    },
    profileUpdated: {
        title: "Profile Updated!",
        subTitle: "Your profile has been successfully updated!"
    },
    phoneNumberUpdated: {
        title: "Phone Number Updated!",
        subTitle: "Your phone number has been successfully updated!"
    },
    emailVerified: {
        title: "Email Confirmed!",
        subTitle: "Congratulations! Your email has been confirmed!"
    },
    emailVerificationSent: {
        title: "Email Confirmation Sent!",
        subTitle: "An email confirmation has been sent to: "
    },
    accountDeleted: {
        title: "Account Deleted!",
        subTitle: "Your account has been successfully deleted."
    },
    passwordChanged: {
        title: "Password Changed!",
        subTitle: "Your password has been successfully changed."
    },
    friendRequestSent: {
        title: "Friend Request Sent!",
        subTitle: "Your friend request has been successfully sent!"
    },
    friendRequestRemoved: {
        title: "Friend Request Deleted!",
        subTitle: "Your friend request has been successfully deleted."
    },
    groupUpdated: {
        title: "Group Updated!",
        subTitle: "This group has been successfully updated!"
    },
    groupLeft: {
        title: "Leave Group",
        subTitle: "You have successfully left this group."
    }
};
var AlertProvider = /** @class */ (function () {
    function AlertProvider(alertCtrl, logoutProvider, toast) {
        this.alertCtrl = alertCtrl;
        this.logoutProvider = logoutProvider;
        this.toast = toast;
    }
    // Show profile updated
    AlertProvider.prototype.showProfileUpdatedMessage = function () {
        this.alert = this.alertCtrl
            .create({
            title: successMessages.profileUpdated["title"],
            subTitle: successMessages.profileUpdated["subTitle"],
            buttons: ["OK"]
        })
            .present();
    };
    AlertProvider.prototype.showPhoneNumberUpdatedMessage = function () {
        this.alert = this.alertCtrl
            .create({
            title: successMessages.phoneNumberUpdated["title"],
            subTitle: successMessages.phoneNumberUpdated["subTitle"],
            buttons: ["OK"]
        })
            .present();
    };
    // Show password reset sent
    AlertProvider.prototype.showPasswordResetMessage = function (email) {
        this.alert = this.alertCtrl
            .create({
            title: successMessages.passwordResetSent["title"],
            subTitle: successMessages.passwordResetSent["subTitle"] + email,
            buttons: ["OK"]
        })
            .present();
    };
    // Show email verified and redirect to homePage
    AlertProvider.prototype.showEmailVerifiedMessageAndRedirect = function (navCtrl) {
        this.alert = this.alertCtrl
            .create({
            title: successMessages.emailVerified["title"],
            subTitle: successMessages.emailVerified["subTitle"],
            buttons: [
                {
                    text: "OK",
                    handler: function () {
                        //navCtrl.setRoot(Login.homePage);
                    }
                }
            ]
        })
            .present();
    };
    // Show email verification sent
    AlertProvider.prototype.showEmailVerificationSentMessage = function (email) {
        this.alert = this.alertCtrl
            .create({
            title: successMessages.emailVerificationSent["title"],
            subTitle: successMessages.emailVerificationSent["subTitle"] + email,
            buttons: ["OK"]
        })
            .present();
    };
    // Show account deleted
    AlertProvider.prototype.showAccountDeletedMessage = function () {
        this.alert = this.alertCtrl
            .create({
            title: successMessages.accountDeleted["title"],
            subTitle: successMessages.accountDeleted["subTitle"],
            buttons: ["OK"]
        })
            .present();
    };
    // Show password changed
    AlertProvider.prototype.showPasswordChangedMessage = function () {
        this.alert = this.alertCtrl
            .create({
            title: successMessages.passwordChanged["title"],
            subTitle: successMessages.passwordChanged["subTitle"],
            buttons: ["OK"]
        })
            .present();
    };
    // show alert
    AlertProvider.prototype.showAlert = function (title, subTitle) {
        this.alert = this.alertCtrl
            .create({
            title: title,
            subTitle: subTitle,
            buttons: ["OK"]
        })
            .present();
    };
    // Show friend request sent
    AlertProvider.prototype.showFriendRequestSent = function () {
        this.alert = this.alertCtrl
            .create({
            title: successMessages.friendRequestSent["title"],
            subTitle: successMessages.friendRequestSent["subTitle"],
            buttons: ["OK"]
        })
            .present();
    };
    // Show friend request removed
    AlertProvider.prototype.showFriendRequestRemoved = function () {
        this.alert = this.alertCtrl
            .create({
            title: successMessages.friendRequestRemoved["title"],
            subTitle: successMessages.friendRequestRemoved["subTitle"],
            buttons: ["OK"]
        })
            .present();
    };
    // Show group updated.
    AlertProvider.prototype.showGroupUpdatedMessage = function () {
        this.alert = this.alertCtrl
            .create({
            title: successMessages.groupUpdated["title"],
            subTitle: successMessages.groupUpdated["subTitle"],
            buttons: ["OK"]
        })
            .present();
    };
    // Show error messages depending on the code
    // If you added custom error codes on top, make sure to add a case block for it.
    AlertProvider.prototype.showErrorMessage = function (code) {
        switch (code) {
            // Firebase Error Messages
            case "auth/account-exists-with-different-credential":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.accountExistsWithDifferentCredential["title"],
                    subTitle: errorMessages.accountExistsWithDifferentCredential["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "auth/invalid-credential":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.invalidCredential["title"],
                    subTitle: errorMessages.invalidCredential["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "auth/operation-not-allowed":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.operationNotAllowed["title"],
                    subTitle: errorMessages.operationNotAllowed["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "auth/user-disabled":
                this.alert = this.alertCtrl.create({
                    title: errorMessages.userDisabled["title"],
                    subTitle: errorMessages.userDisabled["subTitle"],
                    buttons: ["OK"]
                });
                this.alert.present();
                break;
            case "auth/user-not-found":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.userNotFound["title"],
                    subTitle: errorMessages.userNotFound["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "auth/wrong-password":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.wrongPassword["title"],
                    subTitle: errorMessages.wrongPassword["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "auth/invalid-email":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.invalidEmail["title"],
                    subTitle: errorMessages.invalidEmail["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "auth/email-already-in-use":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.emailAlreadyInUse["title"],
                    subTitle: errorMessages.emailAlreadyInUse["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "auth/weak-password":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.weakPassword["title"],
                    subTitle: errorMessages.weakPassword["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "auth/requires-recent-login":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.requiresRecentLogin["title"],
                    subTitle: errorMessages.requiresRecentLogin["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "auth/user-mismatch":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.userMismatch["title"],
                    subTitle: errorMessages.userMismatch["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "auth/provider-already-linked":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.providerAlreadyLinked["title"],
                    subTitle: errorMessages.providerAlreadyLinked["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "auth/credential-already-in-use":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.credentialAlreadyInUse["title"],
                    subTitle: errorMessages.credentialAlreadyInUse["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            // Profile Error Messages
            case "profile/error-change-name":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.changeName["title"],
                    subTitle: errorMessages.changeName["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "profile/invalid-chars-name":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.invalidCharsName["title"],
                    subTitle: errorMessages.invalidCharsName["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "profile/name-too-short":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.nameTooShort["title"],
                    subTitle: errorMessages.nameTooShort["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "profile/error-change-email":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.changeEmail["title"],
                    subTitle: errorMessages.changeEmail["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "profile/invalid-email":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.invalidProfileEmail["title"],
                    subTitle: errorMessages.invalidProfileEmail["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "profile/error-change-photo":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.changePhoto["title"],
                    subTitle: errorMessages.changePhoto["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "profile/password-too-short":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.passwordTooShort["title"],
                    subTitle: errorMessages.passwordTooShort["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "profile/invalid-chars-password":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.invalidCharsPassword["title"],
                    subTitle: errorMessages.invalidCharsPassword["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "profile/passwords-do-not-match":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.passwordsDoNotMatch["title"],
                    subTitle: errorMessages.passwordsDoNotMatch["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "profile/error-update-profile":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.updateProfile["title"],
                    subTitle: errorMessages.updateProfile["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "profile/error-same-username":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.usernameExists["title"],
                    subTitle: errorMessages.usernameExists["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "profile/error-same-phoneNumber":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.phoneNumberExists["title"],
                    subTitle: errorMessages.phoneNumberExists["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            //Image Error Messages
            case "image/error-image-upload":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.imageUpload["title"],
                    subTitle: errorMessages.imageUpload["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            // Group Error MEssages
            case "group/error-update-group":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.groupUpdate["title"],
                    subTitle: errorMessages.groupUpdate["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "group/error-leave-group":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.groupLeave["title"],
                    subTitle: errorMessages.groupLeave["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
            case "group/error-delete-group":
                this.alert = this.alertCtrl
                    .create({
                    title: errorMessages.groupDelete["title"],
                    subTitle: errorMessages.groupDelete["subTitle"],
                    buttons: ["OK"]
                })
                    .present();
                break;
        }
    };
    AlertProvider.prototype.showToast = function (msg) {
        this.toast.show(msg, "5000", "bottom").subscribe(function (toast) { });
    };
    AlertProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__logout__["a" /* LogoutProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */]])
    ], AlertProvider);
    return AlertProvider;
}());

//# sourceMappingURL=alert.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_image__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_maps__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(240);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the AddPostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddPostPage = /** @class */ (function () {
    function AddPostPage(navCtrl, navParams, loadingProvider, dataProvider, angularDb, firebaseProvider, alertCtrl, imageProvider, alertProvider, googleMaps, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingProvider = loadingProvider;
        this.dataProvider = dataProvider;
        this.angularDb = angularDb;
        this.firebaseProvider = firebaseProvider;
        this.alertCtrl = alertCtrl;
        this.imageProvider = imageProvider;
        this.alertProvider = alertProvider;
        this.googleMaps = googleMaps;
        this.geolocation = geolocation;
    }
    AddPostPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Observe the userData on database to be used by our markup html.
        // Whenever the userData on the database is updated, it will automatically reflect on our user variable.
        this.dataProvider.getCurrentUser().subscribe(function (user) {
            _this.loadingProvider.hide();
            _this.user = user;
        });
    };
    AddPostPage.prototype.post = function () {
        var _this = this;
        if (this.image) {
            this.loadingProvider.show();
            this.imageProvider.uploadPostImage(this.image).then(function (url) {
                // ======= push new post in 'timeline' ====
                _this.angularDb.list('timeline').push({
                    dateCreated: new Date().toString(),
                    postBy: __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid,
                    postText: _this.postText,
                    image: url
                }).then(function (success) {
                    _this.postText = '';
                    var timelineId = success.key;
                    _this.firebaseProvider.timeline(timelineId);
                    _this.alertProvider.showToast('Add post successfully ..');
                    _this.loadingProvider.hide();
                    _this.navCtrl.pop();
                });
            });
        }
        else if (this.location) {
            this.loadingProvider.show();
            // ======= push new post in 'timeline' ====
            this.angularDb.list('timeline').push({
                dateCreated: new Date().toString(),
                postBy: __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid,
                postText: this.postText,
                location: this.location
            }).then(function (success) {
                _this.postText = '';
                var timelineId = success.key;
                _this.firebaseProvider.timeline(timelineId);
                _this.alertProvider.showToast('Add post successfully ..');
                _this.loadingProvider.hide();
                _this.navCtrl.pop();
            });
        }
        else {
            this.loadingProvider.show();
            // ======= push new post in 'timeline' ====
            this.angularDb.list('timeline').push({
                dateCreated: new Date().toString(),
                postBy: __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid,
                postText: this.postText,
            }).then(function (success) {
                _this.postText = '';
                var timelineId = success.key;
                _this.firebaseProvider.timeline(timelineId);
                _this.alertProvider.showToast('Add post successfully ..');
                _this.loadingProvider.hide();
                _this.navCtrl.pop();
            });
        }
    };
    AddPostPage.prototype.imageShare = function () {
        var _this = this;
        this.imageProvider.setImage().then(function (url) {
            _this.image = url;
        });
    };
    AddPostPage.prototype.locationShare = function () {
        var _this = this;
        this.loadingProvider.show();
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.location = JSON.stringify({ lat: position.coords.latitude, long: position.coords.longitude });
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            var marker = new google.maps.Marker({
                map: _this.map,
                animation: google.maps.Animation.DROP,
                position: _this.map.getCenter()
            });
            _this.loadingProvider.hide();
        }, function (err) {
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], AddPostPage.prototype, "mapElement", void 0);
    AddPostPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-add-post',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/add-post/add-post.html"*/'<!--\n  Generated template for the AddPostPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>add-post</ion-title>\n    <ion-buttons end (click)="post()">\n      <button  [disabled]="!postText">\n      POST\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-line>\n  <ion-item *ngIf="user">\n    <ion-thumbnail item-left  >\n      <img src="{{user.img}}"  >\n    </ion-thumbnail>\n    <p><b>{{user.username}}</b></p>\n  </ion-item>\n  <ion-item>\n    <textarea placeholder="Please enter your message" [(ngModel)]="postText"> </textarea>\n  </ion-item>\n  <ion-item *ngIf="image">\n    <img src="{{image}}">\n  </ion-item>\n  <div #map id="map" style="height:50%;"></div>\n</ion-content>\n<ion-footer>\n  <ion-grid>\n    <ion-row>\n      <ion-col width-50>\n        <button ion-button icon-left block color="primary" (click)="imageShare()" [disabled]="location">\n          <ion-icon name=\'camera\'></ion-icon> Image\n        </button>\n        <!-- <button ion-button icon-only outline color="custom" [disabled]="shareImage">\n          <ion-icon name=\'navigate\'></ion-icon>\n\n        </button> -->\n      </ion-col>\n      <ion-col width-50>\n        <button ion-button icon-left block color="primary" (click)="locationShare()"  [disabled]="image"> <!---(click)="locationShare()" -->\n            <ion-icon name=\'navigate\'></ion-icon>\n            Location\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-footer>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/add-post/add-post.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_6__providers_firebase__["a" /* FirebaseProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_image__["a" /* ImageProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_maps__["a" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */]])
    ], AddPostPage);
    return AddPostPage;
}());

//# sourceMappingURL=add-post.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the CommentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CommentsPage = /** @class */ (function () {
    function CommentsPage(navCtrl, navParams, viewCtrl, firebaseProvider, dataProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.firebaseProvider = firebaseProvider;
        this.dataProvider = dataProvider;
        this.postKey = this.navParams.get('postKey');
    }
    CommentsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.dataProvider.getComments(this.postKey).subscribe(function (comments) {
            if (_this.comments) {
                var tempComments = comments[comments.length - 1];
                var tempData_1 = {};
                tempData_1 = tempComments;
                _this.dataProvider.getUser(tempComments.commentBy).subscribe(function (user) {
                    tempData_1.avatar = user.img;
                    tempData_1.name = user.name;
                });
                // this.addOrUpdateTimeline(tempData)
                _this.comments.push(tempData_1);
            }
            else {
                _this.comments = [];
                comments.forEach(function (comment) {
                    if (comment.$exists()) {
                        var tempComment = comment;
                        var tempData_2 = {};
                        tempData_2 = tempComment;
                        _this.dataProvider.getUser(tempComment.commentBy).subscribe(function (user) {
                            tempData_2.avatar = user.img;
                            tempData_2.name = user.name;
                        });
                        // this.addOrUpdateTimeline(tempData)
                        _this.comments.push(tempData_2);
                    }
                });
            }
        });
    };
    CommentsPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CommentsPage.prototype.postComment = function () {
        var _this = this;
        var comment = {
            dateCreated: new Date().toString(),
            commentBy: __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid,
            commentText: this.commentText,
        };
        this.firebaseProvider.commentPost(this.postKey, comment).then(function (res) {
            _this.commentText = '';
        });
    };
    CommentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-comments',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/comments/comments.html"*/'<!--\n  Generated template for the Comment page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-toolbar color="custom">\n\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Comment\n    </ion-title>\n\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content >\n\n  <ion-list *ngIf="comments">\n    <ion-item  *ngFor="let item of comments">\n\n      <ion-avatar item-left >\n        <img src="{{item.avatar}}" >\n      </ion-avatar>\n      <h2>{{item.name}}</h2>\n      <p>{{item.commentText}} </p>\n      <ion-note item-right>{{item.dateCreated | DateFormat}}</ion-note>\n    </ion-item>\n    <!-- <div class="nocomment" *ngIf="!commentList.length">\n      <img src="assets/no-record.png">\n\n    </div> -->\n  </ion-list>\n\n</ion-content>\n<ion-footer >\n  <ion-grid>\n    <ion-row>\n        <!--<ion-col col-12>\n       <button ion-button icon-only color="custom" (click)="imageShare()">\n          <ion-icon name=\'camera\'></ion-icon>\n        </button>\n      </ion-col>-->\n      <ion-col col-10>\n        <ion-textarea  placeholder="Enter your comment" [(ngModel)]="commentText"></ion-textarea>\n\n      </ion-col>\n      <ion-col col-2>\n        <button ion-button icon-only  color="custom" (click)="postComment()" [disabled]="!commentText">\n          <ion-icon name=\'send\'></ion-icon>\n\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-footer>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/comments/comments.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_firebase__["a" /* FirebaseProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data__["a" /* DataProvider */]])
    ], CommentsPage);
    return CommentsPage;
}());

//# sourceMappingURL=comments.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportedPostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ReportedPostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ReportedPostPage = /** @class */ (function () {
    function ReportedPostPage(navCtrl, navParams, dataProvider, loadingProvider, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.reportedPost = [];
    }
    ReportedPostPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReportedPostPage');
        this.loadingProvider.show();
        this.getReportedPost();
    };
    ReportedPostPage.prototype.reportPost = function (item) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: "Reported Post",
            buttons: [
                {
                    text: 'Delete post',
                    role: 'destructive',
                    handler: function () {
                        console.log(" report Post ", item);
                        _this.dataProvider.removePost(item);
                    }
                },
                {
                    text: 'Ignore Post',
                    role: 'destructive',
                    handler: function () {
                        console.log('Cancel clicked', item);
                        _this.dataProvider.ignorePost(item);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ReportedPostPage.prototype.getReportedPost = function () {
        var _this = this;
        this.dataProvider.getAllReportedPost().subscribe(function (post) {
            _this.loadingProvider.hide();
            _this.reportedPost = post;
        });
    };
    ReportedPostPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-reported-post',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/reported-post/reported-post.html"*/'<!--\n  Generated template for the ReportedPostPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Reported post</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card *ngFor="let item of reportedPost">\n    <ion-item>\n      <ion-avatar item-left>\n        <img src="{{item.avatar}}">\n      </ion-avatar>\n      <h2>{{item.name}}</h2>\n      <p>{{item.dateCreated | DateFormat}}</p>\n      <ion-icon item-right ios="ios-more" md="md-more" (click)="reportPost(item)"></ion-icon>\n\n    </ion-item>\n\n    <ion-card-content>\n      <p>{{item.postText}}</p>\n    </ion-card-content>\n    <!-- <img *ngIf="p.isType==2"   src="{{p.mapUrl}}" style="200px" (click)="openMap(p.mapData.lat,p.mapData.long)"> -->\n    <img src="{{item.image}}" style="height:200px" (click)="enlargeImage(item.image)" *ngIf="item.image != \'\' ">\n    <img src="{{item.location}}" style="height:200px" *ngIf="item.location != \'\'">\n    <h3 padding><b>Reported by  </b></h3>\n    <ion-item *ngFor="let user of item.reportedBy; let i = index">\n      <ion-avatar item-left>\n        <img src="{{user.image}}">\n      </ion-avatar>\n      <h2>{{user.name}}</h2>\n      <p item-right>{{user.dateCreated | DateFormat}}</p>\n\n    </ion-item>\n  </ion-card>\n  <p *ngIf="reportedPost.length<1" style="text-align:center">\n    No reported post found\n  </p>\n</ion-content>'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/reported-post/reported-post.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], ReportedPostPage);
    return ReportedPostPage;
}());

//# sourceMappingURL=reported-post.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimelinePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_post_add_post__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__comments_comments__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__image_modal_image_modal__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__update_contact_update_contact__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_logout__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















/**
 * Generated class for the TimelinePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var TimelinePage = /** @class */ (function () {
    function TimelinePage(navCtrl, navParams, loadingProvider, angularDb, dataProvider, firebaseProvider, modalCtrl, alertCtrl, actionSheetCtrl, alertProvider, logoutProvider, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingProvider = loadingProvider;
        this.angularDb = angularDb;
        this.dataProvider = dataProvider;
        this.firebaseProvider = firebaseProvider;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertProvider = alertProvider;
        this.logoutProvider = logoutProvider;
        this.platform = platform;
        this.platform.ready().then(function () {
            _this.platform.pause.subscribe(function () {
                _this.isFirstTime = false;
                if (_this.user.userId) {
                    // Update userData on Database.
                    _this.angularDb
                        .object("/accounts/" + _this.user.userId)
                        .update({
                        isOnline: false
                    })
                        .then(function (success) { })
                        .catch(function (error) {
                        //this.alertProvider.showErrorMessage('profile/error-update-profile');
                    });
                }
            });
            _this.platform.resume.subscribe(function () {
                _this.isFirstTime = false;
                if (_this.user.userId) {
                    // Update userData on Database.
                    _this.angularDb
                        .object("/accounts/" + _this.user.userId)
                        .update({
                        isOnline: true
                    })
                        .then(function (success) { })
                        .catch(function (error) {
                        //this.alertProvider.showErrorMessage('profile/error-update-profile');
                    });
                }
            });
            _this.dataProvider.getData("userData").then(function (data) {
                if (data.phoneNumber == "") {
                    var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_12__update_contact_update_contact__["a" /* UpdateContactPage */], {
                        userData: data
                    });
                    modal.present();
                }
            });
        });
    }
    TimelinePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.isFirstTime = true;
        this.getTimeline();
        this.dataProvider.getCurrentUser().subscribe(function (user) {
            console.log("==user", user);
            if (user.isBlock) {
                _this.logoutProvider.logout().then(function (res) {
                    _this.dataProvider.clearData();
                    AccountKitPlugin.logout();
                    _this.navCtrl.parent.parent.setRoot(__WEBPACK_IMPORTED_MODULE_13__login_login__["a" /* LoginPage */]);
                    _this.alertProvider.showToast("You are temporary blocked.");
                });
            }
        });
    };
    TimelinePage.prototype.getTimeline = function () {
        var _this = this;
        // Observe the userData on database to be used by our markup html.
        // Whenever the userData on the database is updated, it will automatically reflect on our user variable.
        this.loadingProvider.show();
        //this.createUserData();
        var userData = this.dataProvider.getCurrentUser().subscribe(function (user) {
            _this.user = user;
            console.log("timline user", _this.user);
            _this.dataProvider.getContact().then(function (data) {
                if (data && _this.user.phoneNumber != "") {
                    _this.dataProvider.setContactWithCountryCode(_this.user.countryCode);
                }
            });
            _this.dataProvider.setData("userData", _this.user);
            userData.unsubscribe();
            //  Update userData on Database.
        });
        // Get Friend  List
        this.dataProvider.getFriends().subscribe(function (friends) {
            // Get timeline by user
            _this.dataProvider.getTimelinePost().subscribe(function (post) {
                _this.loadingProvider.hide();
                if (_this.timelineData) {
                    var timeline_1 = post[post.length - 1];
                    var tempData_1 = {};
                    tempData_1 = timeline_1;
                    var friendIndex = __WEBPACK_IMPORTED_MODULE_8_lodash__["findKey"](friends, function (data) {
                        var _tempData = data;
                        return _tempData.$value == timeline_1.postBy;
                    });
                    if (friendIndex ||
                        timeline_1.postBy == __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid) {
                        _this.dataProvider.getUser(timeline_1.postBy).subscribe(function (user) {
                            tempData_1.avatar = user.img;
                            tempData_1.name = user.name;
                        });
                        // Check Locaion
                        if (timeline_1.location) {
                            var tempLocaion = JSON.parse(timeline_1.location);
                            tempData_1.lat = tempLocaion.lat;
                            tempData_1.long = tempLocaion.long;
                            // tempData.location="https://maps.googleapis.com/maps/api/staticmap?&zoom=13&size=500x200&maptype=roadmap&markers=color:red|label:S|"+tempLocaion.lat+","+tempLocaion.long+"&key=AIzaSyAt0edUAx4S2d7z8wh1Xe04yE9Xml1ZLPY"
                            tempData_1.location =
                                "https://maps.googleapis.com/maps/api/staticmap?&zoom=13&size=500x200&maptype=roadmap&markers=color:red|label:S|40.702147,-74.015794&key=AIzaSyAt0edUAx4S2d7z8wh1Xe04yE9Xml1ZLPY";
                        }
                        //  ===== check like and commnets ===
                        _this.dataProvider.getLike(tempData_1.$key).subscribe(function (likes) {
                            tempData_1.likes = likes.length;
                            var isLike = __WEBPACK_IMPORTED_MODULE_8_lodash__["findKey"](likes, function (like) {
                                var _tempLike = like;
                                return _tempLike.$value == __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid;
                            });
                            if (isLike) {
                                tempData_1.isLike = true;
                            }
                            else {
                                tempData_1.isLike = false;
                            }
                        });
                        //  ===== check dilike
                        _this.dataProvider.getdisLike(tempData_1.$key).subscribe(function (dislikes) {
                            tempData_1.dislikes = dislikes.length;
                            // Check post like or not
                            var isdisLike = __WEBPACK_IMPORTED_MODULE_8_lodash__["findKey"](dislikes, function (dislike) {
                                var _tempLike = dislike;
                                return _tempLike.$value == __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid;
                            });
                            if (isdisLike) {
                                tempData_1.isdisLike = true;
                            }
                            else {
                                tempData_1.isdisLike = false;
                            }
                        });
                        //  ===== check commnets
                        _this.dataProvider.getComments(tempData_1.$key).subscribe(function (comments) {
                            tempData_1.comments = comments.length;
                            // Check post like or not
                            var isComments = __WEBPACK_IMPORTED_MODULE_8_lodash__["findKey"](comments, function (comment) {
                                var _tempComment = comment;
                                return (_tempComment.commentBy == __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid);
                            });
                            if (isComments) {
                                tempData_1.isComment = true;
                            }
                            else {
                                tempData_1.isComment = false;
                            }
                        });
                        // this.addOrUpdateTimeline(tempData)
                        _this.timelineData.unshift(tempData_1);
                    }
                }
                else {
                    _this.timelineData = [];
                    post.forEach(function (data) {
                        _this.dataProvider.getTimeline(data.$key).subscribe(function (timeline) {
                            if (timeline.$exists()) {
                                var tempData_2 = {};
                                tempData_2 = timeline;
                                var friendIndex = __WEBPACK_IMPORTED_MODULE_8_lodash__["findKey"](friends, function (data) {
                                    var _tempData = data;
                                    return _tempData.$value == timeline.postBy;
                                });
                                if (friendIndex ||
                                    timeline.postBy == __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid) {
                                    _this.dataProvider.getUser(timeline.postBy).subscribe(function (user) {
                                        tempData_2.avatar = user.img;
                                        tempData_2.name = user.name;
                                    });
                                    // Check Location
                                    if (timeline.location) {
                                        var tempLocaion = JSON.parse(timeline.location);
                                        tempData_2.lat = tempLocaion.lat;
                                        tempData_2.long = tempLocaion.long;
                                        tempData_2.location =
                                            "https://maps.googleapis.com/maps/api/staticmap?&zoom=13&size=500x300&maptype=roadmap&markers=color:red|label:S|" +
                                                tempLocaion.lat +
                                                "," +
                                                tempLocaion.long;
                                    }
                                    //  ===== check like
                                    _this.dataProvider.getLike(tempData_2.$key).subscribe(function (likes) {
                                        tempData_2.likes = likes.length;
                                        // Check post like or not
                                        var isLike = __WEBPACK_IMPORTED_MODULE_8_lodash__["findKey"](likes, function (like) {
                                            var _tempLike = like;
                                            return (_tempLike.$value == __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid);
                                        });
                                        if (isLike) {
                                            tempData_2.isLike = true;
                                        }
                                        else {
                                            tempData_2.isLike = false;
                                        }
                                    });
                                    //  ===== check dilike
                                    _this.dataProvider
                                        .getdisLike(tempData_2.$key)
                                        .subscribe(function (dislikes) {
                                        tempData_2.dislikes = dislikes.length;
                                        // Check post like or not
                                        var isdisLike = __WEBPACK_IMPORTED_MODULE_8_lodash__["findKey"](dislikes, function (dislike) {
                                            var _tempLike = dislike;
                                            return (_tempLike.$value == __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid);
                                        });
                                        if (isdisLike) {
                                            tempData_2.isdisLike = true;
                                        }
                                        else {
                                            tempData_2.isdisLike = false;
                                        }
                                    });
                                    //  ===== check commnets
                                    _this.dataProvider
                                        .getComments(tempData_2.$key)
                                        .subscribe(function (comments) {
                                        tempData_2.comments = comments.length;
                                        // Check post like or not
                                        var isComments = __WEBPACK_IMPORTED_MODULE_8_lodash__["findKey"](comments, function (comment) {
                                            var _tempComment = comment;
                                            return (_tempComment.commentBy ==
                                                __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid);
                                        });
                                        if (isComments) {
                                            tempData_2.isComment = true;
                                        }
                                        else {
                                            tempData_2.isComment = false;
                                        }
                                    });
                                    // this.addOrUpdateTimeline(tempData)
                                    _this.timelineData.unshift(tempData_2);
                                }
                            }
                        });
                    });
                }
            });
        });
        // ====== user post time line
        // this.dataProvider.getTimelines().subscribe((timelineIds)=>{
        //   if(timelineIds.length>0){
        //     this.loadingProvider.hide();
        //       this.timelineData = []
        //       timelineIds.forEach((timelineId)=>{
        //           this.dataProvider.getTimeline(timelineId.$value).subscribe((timeline)=>{
        //             if(timeline.$exists()){
        //               let tempData = <any>{};
        //               tempData = timeline;
        //               this.dataProvider.getUser(timeline.postBy).subscribe((user) => {
        //                 tempData.avatar = user.img;
        //                 tempData.name = user.name
        //               });
        //               // this.addOrUpdateTimeline(tempData)
        //               this.timelineData.unshift(tempData);
        //             }
        //           })
        //       })
        //   } else {
        //     this.timelineData = [];
        //     this.loadingProvider.hide();
        //   }
        // })
        // get all time line
    };
    // report to admin
    TimelinePage.prototype.reportPost = function (item) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: "Report post to admin",
            buttons: [
                {
                    text: "Report",
                    role: "destructive",
                    handler: function () {
                        console.log(" report Post ", item);
                        _this.loadingProvider.show();
                        _this.firebaseProvider.reportPost(item, _this.user).then(function (res) {
                            _this.loadingProvider.hide();
                            _this.alertProvider.showToast("Post reported successfully");
                        }, function (err) {
                            _this.loadingProvider.hide();
                        });
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel",
                    handler: function () {
                        console.log("Cancel clicked");
                    }
                }
            ]
        });
        actionSheet.present();
    };
    // Create userData on the database if it doesn't exist yet.
    TimelinePage.prototype.createUserData = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_6_firebase__["database"]()
            .ref("accounts/" + __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid)
            .once("value")
            .then(function (account) {
            // No database data yet, create user data on database
            if (!account.val()) {
                _this.loadingProvider.show();
                var user = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser;
                var userId, name, provider, img, email, phoneNumber;
                var providerData = user.providerData[0];
                userId = user.uid;
                // Get name from Firebase user.
                if (user.displayName || providerData.displayName) {
                    name = user.displayName;
                    name = providerData.displayName;
                }
                else {
                    name = "ionSocial User";
                }
                // Set default username based on name and userId.
                var username = name.replace(/ /g, "") + userId.substring(0, 8);
                // Get provider from Firebase user.
                if (providerData.providerId == "password") {
                    provider = "Firebase";
                }
                else if (providerData.providerId == "facebook.com") {
                    provider = "Facebook";
                }
                else if (providerData.providerId == "google.com") {
                    provider = "Google";
                }
                // Get photoURL from Firebase user.
                if (user.photoURL || providerData.photoURL) {
                    img = user.photoURL;
                    img = providerData.photoURL;
                }
                else {
                    img = "assets/images/profile.png";
                }
                // Get email from Firebase user.
                email = user.email;
                // Set default description.
                var description = "Hello! I am a new Communicaters user.";
                var uniqueId = Math.floor(Math.random() * 10000000000);
                var tempData = {
                    userId: userId,
                    name: name,
                    username: username,
                    provider: provider,
                    img: img,
                    email: email,
                    description: description,
                    uniqueId: uniqueId,
                    isOnline: true,
                    dateCreated: new Date().toString(),
                    phoneNumber: ""
                };
                // Insert data on our database using AngularFire.
                _this.angularDb
                    .object("/accounts/" + userId)
                    .set(tempData)
                    .then(function () {
                    _this.loadingProvider.hide();
                    //this.videoProvider.InitializingRTC(tempData);
                    // if(!tempData.phonenumber){
                    //     let alert = this.alertCtrl.create({
                    //       title: 'Update your phone number',
                    //       message: 'Please add your contact number',
                    //       buttons: [
                    //         {
                    //           text: 'No'
                    //         },
                    //         {
                    //           text: 'Yes',
                    //           handler: data => {
                    //                this.navCtrl.setRoot(HomePage);
                    //           }
                    //         }]
                    //       }).present()
                    // }
                });
            }
            else {
                //  if(this.user.phonenumber){
                //      this.alertCtrl.create({
                //       title: 'Update your phone number',
                //       message: 'Please add your contact number',
                //       buttons: [
                //         {
                //           text: 'No'
                //         },
                //         {
                //           text: 'Yes',
                //           handler: data => {
                //                this.navCtrl.setRoot(HomePage);
                //           }
                //         }]
                //       }).present()
                // }
                var isDt = true;
                if (isDt) {
                    isDt = false;
                    if (_this.isFirstTime) {
                        setTimeout(function () {
                            //this.videoProvider.InitializingRTC(this.user);
                            _this.angularDb
                                .object("/accounts/" + _this.user.userId)
                                .update({
                                isOnline: true
                            })
                                .then(function (success) { })
                                .catch(function (error) { });
                        }, 500);
                    }
                }
                // let isDt = true;
                // this.dataProvider.getCurrentUser().subscribe((user) => {
                //   this.user = <any>user;
                //   if(isDt){
                //      isDt = false;
                //      if(this.isFirstTime){
                //         setTimeout(()=>{
                //             this.videoProvider.InitializingRTC(this.user);
                //             this.angularDb.object('/accounts/' + this.user.userId).update({
                //               isOnline: true
                //             }).then((success) => {
                //             }).catch((error) => {
                //               //this.alertProvider.showErrorMessage('profile/error-update-profile');
                //             });
                //         },500)
                //       }
                //   }
                // });
            }
        });
    };
    // Add or update timeline data for real-time sync.
    TimelinePage.prototype.addOrUpdateTimeline = function (timeline) {
        if (!this.timelineData) {
            this.timelineData = [timeline];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.timelineData.length; i++) {
                if (this.timelineData[i].$key == timeline.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.timelineData[index] = timeline;
            }
            else {
                this.timelineData.unshift(timeline);
            }
        }
    };
    TimelinePage.prototype.addPost = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__add_post_add_post__["a" /* AddPostPage */]);
    };
    TimelinePage.prototype.likePost = function (post) {
        this.firebaseProvider.likePost(post.$key);
    };
    TimelinePage.prototype.delikePost = function (post) {
        this.firebaseProvider.delikePost(post.$key);
    };
    TimelinePage.prototype.disikePost = function (post) {
        this.firebaseProvider.dislikePost(post.$key);
    };
    TimelinePage.prototype.dedislikePost = function (post) {
        this.firebaseProvider.dedislikePost(post.$key);
    };
    TimelinePage.prototype.commentPost = function (post) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__comments_comments__["a" /* CommentsPage */], { postKey: post.$key });
        modal.present();
    };
    TimelinePage.prototype.openMap = function (lat, long) {
        window.open("http://maps.google.com/maps?q=" + lat + "," + long, "_system", "location=yes");
    };
    // Enlarge image messages.
    TimelinePage.prototype.enlargeImage = function (img) {
        var imageModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__image_modal_image_modal__["a" /* ImageModalPage */], { img: img });
        imageModal.present();
    };
    TimelinePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "page-timeline",template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/timeline/timeline.html"*/'<!--\n  Generated template for the TimelinePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>IonSocial</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n  <ion-card *ngIf="user">\n    <ion-item class="post" (click)="addPost()" >\n      <ion-thumbnail item-left  >\n        <img src="{{user.img}}"  >\n      </ion-thumbnail>\n      <p >What\'s on your mind?</p>\n    </ion-item>\n  </ion-card>\n  <ion-card *ngFor="let item of timelineData">\n    <ion-item >\n      <ion-avatar item-left>\n        <img src="{{item.avatar}}"  >\n      </ion-avatar>\n      <h2>{{item.name}}</h2>\n      <p>{{item.dateCreated | DateFormat}}</p>\n      <ion-icon  item-right ios="ios-more" md="md-more" (click)="reportPost(item)"></ion-icon>\n\n    </ion-item>\n\n    <ion-card-content>\n      <p>{{item.postText}}</p>\n    </ion-card-content>\n    <!-- <img *ngIf="p.isType==2"   src="{{p.mapUrl}}" style="200px" (click)="openMap(p.mapData.lat,p.mapData.long)"> -->\n    <img src="{{item.image}}" style="height:200px" *ngIf="item.image" (click)="enlargeImage(item.image)">\n    <img src="https://maps.googleapis.com/maps/api/staticmap?&zoom=13&size=500x200&maptype=roadmap&markers=color:red|label:S|{{item.lat}},{{item.long}}&key=AIzaSyAt0edUAx4S2d7z8wh1Xe04yE9Xml1ZLPY" style="height:200px" *ngIf="item.location" (click)="openMap(item.lat,item.long)">\n    <ion-row text-center>\n      <ion-col col-4>\n        <button ion-button icon-left clear small color="dark" (click)="likePost(item)" *ngIf="!item.isLike">\n          <ion-icon name="thumbs-up" ></ion-icon>\n          <div> {{item.likes}} Like </div>\n        </button>\n        <button ion-button icon-left clear small color="custom" (click)="delikePost(item)" *ngIf="item.isLike">\n          <ion-icon name="thumbs-up" ></ion-icon>\n          <div>{{item.likes}} Like</div>\n        </button>\n      </ion-col>\n      <ion-col col-4>\n        <button ion-button icon-left clear small color="dark" (click)="disikePost(item)" *ngIf="!item.isdisLike">\n          <ion-icon name="thumbs-down" ></ion-icon>\n          <div> {{item.dislikes}} Dislike </div>\n        </button>\n        <button ion-button icon-left clear small color="custom" (click)="dedislikePost(item)" *ngIf="item.isdisLike">\n          <ion-icon name="thumbs-down" ></ion-icon>\n          <div>{{item.dislikes}} Dislike</div>\n        </button>\n      </ion-col>\n      <ion-col col-4>\n        <button ion-button icon-left clear small color="dark" (click)="commentPost(item)" *ngIf="!item.isComment">\n          <ion-icon name="text"></ion-icon>\n          <div>{{item.comments}} Comment</div>\n        </button>\n        <button ion-button icon-left clear small color="custom" (click)="commentPost(item)" *ngIf="item.isComment" >\n          <ion-icon name="text"></ion-icon>\n          <div>{{item.comments}} Comment</div>\n        </button>\n      </ion-col>\n      <!-- <ion-col center text-center>\n        <button ion-button icon-left clear small color="dark">\n          <ion-icon name="share-alt"></ion-icon>\n          <div>share</div>\n        </button>\n      </ion-col> -->\n    </ion-row>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/timeline/timeline.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_firebase__["a" /* FirebaseProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_11__providers_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_logout__["a" /* LogoutProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]])
    ], TimelinePage);
    return TimelinePage;
}());

//# sourceMappingURL=timeline.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the UsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UsersPage = /** @class */ (function () {
    function UsersPage(navCtrl, navParams, loadingProvider, alertCtrl, angularDb, alertProvider, dataProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingProvider = loadingProvider;
        this.alertCtrl = alertCtrl;
        this.angularDb = angularDb;
        this.alertProvider = alertProvider;
        this.dataProvider = dataProvider;
    }
    UsersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad UsersPage');
        this.loadingProvider.show();
        this.dataProvider.getUsers().subscribe(function (user) {
            _this.loadingProvider.hide();
            _this.users = user;
        });
    };
    UsersPage.prototype.blockUser = function (user) {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm to Block this user',
            message: 'Are you sure you want to block user?',
            buttons: [
                {
                    text: 'No'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.angularDb.object('/accounts/' + user.userId).update({
                            isBlock: true
                        }).then(function (success) {
                        });
                    }
                }
            ]
        }).present();
    };
    UsersPage.prototype.unblockUser = function (user) {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm to unBlock this user',
            message: 'Are you sure you want to unblock user?',
            buttons: [
                {
                    text: 'No'
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.angularDb.object('/accounts/' + user.userId).update({
                            isBlock: false
                        }).then(function (success) {
                        });
                    }
                }
            ]
        }).present();
    };
    UsersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-users',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/users/users.html"*/'<!--\n  Generated template for the UsersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>User list</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card *ngFor="let item of users">\n    <ion-item *ngIf="item.userId">\n      <ion-avatar item-left>\n        <img src="{{item.img}}">\n      </ion-avatar>\n      <h2>{{item.name}}</h2>\n      <button item-right ion-button color="dark" (click)="blockUser(item)" *ngIf="!item.isBlock">Block</button>\n      <button item-right ion-button color="danger" (click)="unblockUser(item)" *ngIf="item.isBlock">Unblock</button>\n    </ion-item>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/users/users.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_5__providers_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */]])
    ], UsersPage);
    return UsersPage;
}());

//# sourceMappingURL=users.js.map

/***/ }),

/***/ 183:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 183;

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-post/add-post.module": [
		612,
		4
	],
	"../pages/comments/comments.module": [
		613,
		3
	],
	"../pages/reported-post/reported-post.module": [
		614,
		2
	],
	"../pages/timeline/timeline.module": [
		615,
		1
	],
	"../pages/users/users.module": [
		616,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 224;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountryCodeProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CountryCodeProvider = /** @class */ (function () {
    function CountryCodeProvider() {
    }
    CountryCodeProvider.prototype.getCountryCode = function () {
        return [{
                name: "United States",
                dial_code: "+1",
                code: "US"
            }, {
                name: "Israel",
                dial_code: "+972",
                code: "IL"
            }, {
                name: "Afghanistan",
                dial_code: "+93",
                code: "AF"
            }, {
                name: "Albania",
                dial_code: "+355",
                code: "AL"
            }, {
                name: "Algeria",
                dial_code: "+213",
                code: "DZ"
            }, {
                name: "AmericanSamoa",
                dial_code: "+1 684",
                code: "AS"
            }, {
                name: "Andorra",
                dial_code: "+376",
                code: "AD"
            }, {
                name: "Angola",
                dial_code: "+244",
                code: "AO"
            }, {
                name: "Anguilla",
                dial_code: "+1 264",
                code: "AI"
            }, {
                name: "Antigua and Barbuda",
                dial_code: "+1268",
                code: "AG"
            }, {
                name: "Argentina",
                dial_code: "+54",
                code: "AR"
            }, {
                name: "Armenia",
                dial_code: "+374",
                code: "AM"
            }, {
                name: "Aruba",
                dial_code: "+297",
                code: "AW"
            }, {
                name: "Australia",
                dial_code: "+61",
                code: "AU"
            }, {
                name: "Austria",
                dial_code: "+43",
                code: "AT"
            }, {
                name: "Azerbaijan",
                dial_code: "+994",
                code: "AZ"
            }, {
                name: "Bahamas",
                dial_code: "+1 242",
                code: "BS"
            }, {
                name: "Bahrain",
                dial_code: "+973",
                code: "BH"
            }, {
                name: "Bangladesh",
                dial_code: "+880",
                code: "BD"
            }, {
                name: "Barbados",
                dial_code: "+1 246",
                code: "BB"
            }, {
                name: "Belarus",
                dial_code: "+375",
                code: "BY"
            }, {
                name: "Belgium",
                dial_code: "+32",
                code: "BE"
            }, {
                name: "Belize",
                dial_code: "+501",
                code: "BZ"
            }, {
                name: "Benin",
                dial_code: "+229",
                code: "BJ"
            }, {
                name: "Bermuda",
                dial_code: "+1 441",
                code: "BM"
            }, {
                name: "Bhutan",
                dial_code: "+975",
                code: "BT"
            }, {
                name: "Bosnia and Herzegovina",
                dial_code: "+387",
                code: "BA"
            }, {
                name: "Botswana",
                dial_code: "+267",
                code: "BW"
            }, {
                name: "Brazil",
                dial_code: "+55",
                code: "BR"
            }, {
                name: "British Indian Ocean Territory",
                dial_code: "+246",
                code: "IO"
            }, {
                name: "Bulgaria",
                dial_code: "+359",
                code: "BG"
            }, {
                name: "Burkina Faso",
                dial_code: "+226",
                code: "BF"
            }, {
                name: "Burundi",
                dial_code: "+257",
                code: "BI"
            }, {
                name: "Cambodia",
                dial_code: "+855",
                code: "KH"
            }, {
                name: "Cameroon",
                dial_code: "+237",
                code: "CM"
            }, {
                name: "Canada",
                dial_code: "+1",
                code: "CA"
            }, {
                name: "Cape Verde",
                dial_code: "+238",
                code: "CV"
            }, {
                name: "Cayman Islands",
                dial_code: "+ 345",
                code: "KY"
            }, {
                name: "Central African Republic",
                dial_code: "+236",
                code: "CF"
            }, {
                name: "Chad",
                dial_code: "+235",
                code: "TD"
            }, {
                name: "Chile",
                dial_code: "+56",
                code: "CL"
            }, {
                name: "China",
                dial_code: "+86",
                code: "CN"
            }, {
                name: "Christmas Island",
                dial_code: "+61",
                code: "CX"
            }, {
                name: "Colombia",
                dial_code: "+57",
                code: "CO"
            }, {
                name: "Comoros",
                dial_code: "+269",
                code: "KM"
            }, {
                name: "Congo",
                dial_code: "+242",
                code: "CG"
            }, {
                name: "Cook Islands",
                dial_code: "+682",
                code: "CK"
            }, {
                name: "Costa Rica",
                dial_code: "+506",
                code: "CR"
            }, {
                name: "Croatia",
                dial_code: "+385",
                code: "HR"
            }, {
                name: "Cuba",
                dial_code: "+53",
                code: "CU"
            }, {
                name: "Cyprus",
                dial_code: "+537",
                code: "CY"
            }, {
                name: "Czech Republic",
                dial_code: "+420",
                code: "CZ"
            }, {
                name: "Denmark",
                dial_code: "+45",
                code: "DK"
            }, {
                name: "Djibouti",
                dial_code: "+253",
                code: "DJ"
            }, {
                name: "Dominica",
                dial_code: "+1 767",
                code: "DM"
            }, {
                name: "Dominican Republic",
                dial_code: "+1 849",
                code: "DO"
            }, {
                name: "Ecuador",
                dial_code: "+593",
                code: "EC"
            }, {
                name: "Egypt",
                dial_code: "+20",
                code: "EG"
            }, {
                name: "El Salvador",
                dial_code: "+503",
                code: "SV"
            }, {
                name: "Equatorial Guinea",
                dial_code: "+240",
                code: "GQ"
            }, {
                name: "Eritrea",
                dial_code: "+291",
                code: "ER"
            }, {
                name: "Estonia",
                dial_code: "+372",
                code: "EE"
            }, {
                name: "Ethiopia",
                dial_code: "+251",
                code: "ET"
            }, {
                name: "Faroe Islands",
                dial_code: "+298",
                code: "FO"
            }, {
                name: "Fiji",
                dial_code: "+679",
                code: "FJ"
            }, {
                name: "Finland",
                dial_code: "+358",
                code: "FI"
            }, {
                name: "France",
                dial_code: "+33",
                code: "FR"
            }, {
                name: "French Guiana",
                dial_code: "+594",
                code: "GF"
            }, {
                name: "French Polynesia",
                dial_code: "+689",
                code: "PF"
            }, {
                name: "Gabon",
                dial_code: "+241",
                code: "GA"
            }, {
                name: "Gambia",
                dial_code: "+220",
                code: "GM"
            }, {
                name: "Georgia",
                dial_code: "+995",
                code: "GE"
            }, {
                name: "Germany",
                dial_code: "+49",
                code: "DE"
            }, {
                name: "Ghana",
                dial_code: "+233",
                code: "GH"
            }, {
                name: "Gibraltar",
                dial_code: "+350",
                code: "GI"
            }, {
                name: "Greece",
                dial_code: "+30",
                code: "GR"
            }, {
                name: "Greenland",
                dial_code: "+299",
                code: "GL"
            }, {
                name: "Grenada",
                dial_code: "+1 473",
                code: "GD"
            }, {
                name: "Guadeloupe",
                dial_code: "+590",
                code: "GP"
            }, {
                name: "Guam",
                dial_code: "+1 671",
                code: "GU"
            }, {
                name: "Guatemala",
                dial_code: "+502",
                code: "GT"
            }, {
                name: "Guinea",
                dial_code: "+224",
                code: "GN"
            }, {
                name: "Guinea-Bissau",
                dial_code: "+245",
                code: "GW"
            }, {
                name: "Guyana",
                dial_code: "+595",
                code: "GY"
            }, {
                name: "Haiti",
                dial_code: "+509",
                code: "HT"
            }, {
                name: "Honduras",
                dial_code: "+504",
                code: "HN"
            }, {
                name: "Hungary",
                dial_code: "+36",
                code: "HU"
            }, {
                name: "Iceland",
                dial_code: "+354",
                code: "IS"
            }, {
                name: "India",
                dial_code: "+91",
                code: "IN"
            }, {
                name: "Indonesia",
                dial_code: "+62",
                code: "ID"
            }, {
                name: "Iraq",
                dial_code: "+964",
                code: "IQ"
            }, {
                name: "Ireland",
                dial_code: "+353",
                code: "IE"
            }, {
                name: "Israel",
                dial_code: "+972",
                code: "IL"
            }, {
                name: "Italy",
                dial_code: "+39",
                code: "IT"
            }, {
                name: "Jamaica",
                dial_code: "+1 876",
                code: "JM"
            }, {
                name: "Japan",
                dial_code: "+81",
                code: "JP"
            }, {
                name: "Jordan",
                dial_code: "+962",
                code: "JO"
            }, {
                name: "Kazakhstan",
                dial_code: "+7 7",
                code: "KZ"
            }, {
                name: "Kenya",
                dial_code: "+254",
                code: "KE"
            }, {
                name: "Kiribati",
                dial_code: "+686",
                code: "KI"
            }, {
                name: "Kuwait",
                dial_code: "+965",
                code: "KW"
            }, {
                name: "Kyrgyzstan",
                dial_code: "+996",
                code: "KG"
            }, {
                name: "Latvia",
                dial_code: "+371",
                code: "LV"
            }, {
                name: "Lebanon",
                dial_code: "+961",
                code: "LB"
            }, {
                name: "Lesotho",
                dial_code: "+266",
                code: "LS"
            }, {
                name: "Liberia",
                dial_code: "+231",
                code: "LR"
            }, {
                name: "Liechtenstein",
                dial_code: "+423",
                code: "LI"
            }, {
                name: "Lithuania",
                dial_code: "+370",
                code: "LT"
            }, {
                name: "Luxembourg",
                dial_code: "+352",
                code: "LU"
            }, {
                name: "Madagascar",
                dial_code: "+261",
                code: "MG"
            }, {
                name: "Malawi",
                dial_code: "+265",
                code: "MW"
            }, {
                name: "Malaysia",
                dial_code: "+60",
                code: "MY"
            }, {
                name: "Maldives",
                dial_code: "+960",
                code: "MV"
            }, {
                name: "Mali",
                dial_code: "+223",
                code: "ML"
            }, {
                name: "Malta",
                dial_code: "+356",
                code: "MT"
            }, {
                name: "Marshall Islands",
                dial_code: "+692",
                code: "MH"
            }, {
                name: "Martinique",
                dial_code: "+596",
                code: "MQ"
            }, {
                name: "Mauritania",
                dial_code: "+222",
                code: "MR"
            }, {
                name: "Mauritius",
                dial_code: "+230",
                code: "MU"
            }, {
                name: "Mayotte",
                dial_code: "+262",
                code: "YT"
            }, {
                name: "Mexico",
                dial_code: "+52",
                code: "MX"
            }, {
                name: "Monaco",
                dial_code: "+377",
                code: "MC"
            }, {
                name: "Mongolia",
                dial_code: "+976",
                code: "MN"
            }, {
                name: "Montenegro",
                dial_code: "+382",
                code: "ME"
            }, {
                name: "Montserrat",
                dial_code: "+1664",
                code: "MS"
            }, {
                name: "Morocco",
                dial_code: "+212",
                code: "MA"
            }, {
                name: "Myanmar",
                dial_code: "+95",
                code: "MM"
            }, {
                name: "Namibia",
                dial_code: "+264",
                code: "NA"
            }, {
                name: "Nauru",
                dial_code: "+674",
                code: "NR"
            }, {
                name: "Nepal",
                dial_code: "+977",
                code: "NP"
            }, {
                name: "Netherlands",
                dial_code: "+31",
                code: "NL"
            }, {
                name: "Netherlands Antilles",
                dial_code: "+599",
                code: "AN"
            }, {
                name: "New Caledonia",
                dial_code: "+687",
                code: "NC"
            }, {
                name: "New Zealand",
                dial_code: "+64",
                code: "NZ"
            }, {
                name: "Nicaragua",
                dial_code: "+505",
                code: "NI"
            }, {
                name: "Niger",
                dial_code: "+227",
                code: "NE"
            }, {
                name: "Nigeria",
                dial_code: "+234",
                code: "NG"
            }, {
                name: "Niue",
                dial_code: "+683",
                code: "NU"
            }, {
                name: "Norfolk Island",
                dial_code: "+672",
                code: "NF"
            }, {
                name: "Northern Mariana Islands",
                dial_code: "+1 670",
                code: "MP"
            }, {
                name: "Norway",
                dial_code: "+47",
                code: "NO"
            }, {
                name: "Oman",
                dial_code: "+968",
                code: "OM"
            }, {
                name: "Pakistan",
                dial_code: "+92",
                code: "PK"
            }, {
                name: "Palau",
                dial_code: "+680",
                code: "PW"
            }, {
                name: "Panama",
                dial_code: "+507",
                code: "PA"
            }, {
                name: "Papua New Guinea",
                dial_code: "+675",
                code: "PG"
            }, {
                name: "Paraguay",
                dial_code: "+595",
                code: "PY"
            }, {
                name: "Peru",
                dial_code: "+51",
                code: "PE"
            }, {
                name: "Philippines",
                dial_code: "+63",
                code: "PH"
            }, {
                name: "Poland",
                dial_code: "+48",
                code: "PL"
            }, {
                name: "Portugal",
                dial_code: "+351",
                code: "PT"
            }, {
                name: "Puerto Rico",
                dial_code: "+1 939",
                code: "PR"
            }, {
                name: "Qatar",
                dial_code: "+974",
                code: "QA"
            }, {
                name: "Romania",
                dial_code: "+40",
                code: "RO"
            }, {
                name: "Rwanda",
                dial_code: "+250",
                code: "RW"
            }, {
                name: "Samoa",
                dial_code: "+685",
                code: "WS"
            }, {
                name: "San Marino",
                dial_code: "+378",
                code: "SM"
            }, {
                name: "Saudi Arabia",
                dial_code: "+966",
                code: "SA"
            }, {
                name: "Senegal",
                dial_code: "+221",
                code: "SN"
            }, {
                name: "Serbia",
                dial_code: "+381",
                code: "RS"
            }, {
                name: "Seychelles",
                dial_code: "+248",
                code: "SC"
            }, {
                name: "Sierra Leone",
                dial_code: "+232",
                code: "SL"
            }, {
                name: "Singapore",
                dial_code: "+65",
                code: "SG"
            }, {
                name: "Slovakia",
                dial_code: "+421",
                code: "SK"
            }, {
                name: "Slovenia",
                dial_code: "+386",
                code: "SI"
            }, {
                name: "Solomon Islands",
                dial_code: "+677",
                code: "SB"
            }, {
                name: "South Africa",
                dial_code: "+27",
                code: "ZA"
            }, {
                name: "South Georgia and the South Sandwich Islands",
                dial_code: "+500",
                code: "GS"
            }, {
                name: "Spain",
                dial_code: "+34",
                code: "ES"
            }, {
                name: "Sri Lanka",
                dial_code: "+94",
                code: "LK"
            }, {
                name: "Sudan",
                dial_code: "+249",
                code: "SD"
            }, {
                name: "Suriname",
                dial_code: "+597",
                code: "SR"
            }, {
                name: "Swaziland",
                dial_code: "+268",
                code: "SZ"
            }, {
                name: "Sweden",
                dial_code: "+46",
                code: "SE"
            }, {
                name: "Switzerland",
                dial_code: "+41",
                code: "CH"
            }, {
                name: "Tajikistan",
                dial_code: "+992",
                code: "TJ"
            }, {
                name: "Thailand",
                dial_code: "+66",
                code: "TH"
            }, {
                name: "Togo",
                dial_code: "+228",
                code: "TG"
            }, {
                name: "Tokelau",
                dial_code: "+690",
                code: "TK"
            }, {
                name: "Tonga",
                dial_code: "+676",
                code: "TO"
            }, {
                name: "Trinidad and Tobago",
                dial_code: "+1 868",
                code: "TT"
            }, {
                name: "Tunisia",
                dial_code: "+216",
                code: "TN"
            }, {
                name: "Turkey",
                dial_code: "+90",
                code: "TR"
            }, {
                name: "Turkmenistan",
                dial_code: "+993",
                code: "TM"
            }, {
                name: "Turks and Caicos Islands",
                dial_code: "+1 649",
                code: "TC"
            }, {
                name: "Tuvalu",
                dial_code: "+688",
                code: "TV"
            }, {
                name: "Uganda",
                dial_code: "+256",
                code: "UG"
            }, {
                name: "Ukraine",
                dial_code: "+380",
                code: "UA"
            }, {
                name: "United Arab Emirates",
                dial_code: "+971",
                code: "AE"
            }, {
                name: "United Kingdom",
                dial_code: "+44",
                code: "GB"
            }, {
                name: "Uruguay",
                dial_code: "+598",
                code: "UY"
            }, {
                name: "Uzbekistan",
                dial_code: "+998",
                code: "UZ"
            }, {
                name: "Vanuatu",
                dial_code: "+678",
                code: "VU"
            }, {
                name: "Wallis and Futuna",
                dial_code: "+681",
                code: "WF"
            }, {
                name: "Yemen",
                dial_code: "+967",
                code: "YE"
            }, {
                name: "Zambia",
                dial_code: "+260",
                code: "ZM"
            }, {
                name: "Zimbabwe",
                dial_code: "+263",
                code: "ZW"
            }, {
                name: "land Islands",
                dial_code: "",
                code: "AX"
            }, {
                name: "Antarctica",
                dial_code: null,
                code: "AQ"
            }, {
                name: "Bolivia, Plurinational State of",
                dial_code: "+591",
                code: "BO"
            }, {
                name: "Brunei Darussalam",
                dial_code: "+673",
                code: "BN"
            }, {
                name: "Cocos (Keeling) Islands",
                dial_code: "+61",
                code: "CC"
            }, {
                name: "Congo, The Democratic Republic of the",
                dial_code: "+243",
                code: "CD"
            }, {
                name: "Cote d'Ivoire",
                dial_code: "+225",
                code: "CI"
            }, {
                name: "Falkland Islands (Malvinas)",
                dial_code: "+500",
                code: "FK"
            }, {
                name: "Guernsey",
                dial_code: "+44",
                code: "GG"
            }, {
                name: "Holy See (Vatican City State)",
                dial_code: "+379",
                code: "VA"
            }, {
                name: "Hong Kong",
                dial_code: "+852",
                code: "HK"
            }, {
                name: "Iran, Islamic Republic of",
                dial_code: "+98",
                code: "IR"
            }, {
                name: "Isle of Man",
                dial_code: "+44",
                code: "IM"
            }, {
                name: "Jersey",
                dial_code: "+44",
                code: "JE"
            }, {
                name: "Korea, Democratic People's Republic of",
                dial_code: "+850",
                code: "KP"
            }, {
                name: "Korea, Republic of",
                dial_code: "+82",
                code: "KR"
            }, {
                name: "Lao People's Democratic Republic",
                dial_code: "+856",
                code: "LA"
            }, {
                name: "Libyan Arab Jamahiriya",
                dial_code: "+218",
                code: "LY"
            }, {
                name: "Macao",
                dial_code: "+853",
                code: "MO"
            }, {
                name: "Macedonia, The Former Yugoslav Republic of",
                dial_code: "+389",
                code: "MK"
            }, {
                name: "Micronesia, Federated States of",
                dial_code: "+691",
                code: "FM"
            }, {
                name: "Moldova, Republic of",
                dial_code: "+373",
                code: "MD"
            }, {
                name: "Mozambique",
                dial_code: "+258",
                code: "MZ"
            }, {
                name: "Palestinian Territory, Occupied",
                dial_code: "+970",
                code: "PS"
            }, {
                name: "Pitcairn",
                dial_code: "+872",
                code: "PN"
            }, {
                name: "Réunion",
                dial_code: "+262",
                code: "RE"
            }, {
                name: "Russia",
                dial_code: "+7",
                code: "RU"
            }, {
                name: "Saint Barthélemy",
                dial_code: "+590",
                code: "BL"
            }, {
                name: "Saint Helena, Ascension and Tristan Da Cunha",
                dial_code: "+290",
                code: "SH"
            }, {
                name: "Saint Kitts and Nevis",
                dial_code: "+1 869",
                code: "KN"
            }, {
                name: "Saint Lucia",
                dial_code: "+1 758",
                code: "LC"
            }, {
                name: "Saint Martin",
                dial_code: "+590",
                code: "MF"
            }, {
                name: "Saint Pierre and Miquelon",
                dial_code: "+508",
                code: "PM"
            }, {
                name: "Saint Vincent and the Grenadines",
                dial_code: "+1 784",
                code: "VC"
            }, {
                name: "Sao Tome and Principe",
                dial_code: "+239",
                code: "ST"
            }, {
                name: "Somalia",
                dial_code: "+252",
                code: "SO"
            }, {
                name: "Svalbard and Jan Mayen",
                dial_code: "+47",
                code: "SJ"
            }, {
                name: "Syrian Arab Republic",
                dial_code: "+963",
                code: "SY"
            }, {
                name: "Taiwan, Province of China",
                dial_code: "+886",
                code: "TW"
            }, {
                name: "Tanzania, United Republic of",
                dial_code: "+255",
                code: "TZ"
            }, {
                name: "Timor-Leste",
                dial_code: "+670",
                code: "TL"
            }, {
                name: "Venezuela, Bolivarian Republic of",
                dial_code: "+58",
                code: "VE"
            }, {
                name: "Viet Nam",
                dial_code: "+84",
                code: "VN"
            }, {
                name: "Virgin Islands, British",
                dial_code: "+1 284",
                code: "VG"
            }, {
                name: "Virgin Islands, U.S.",
                dial_code: "+1 340",
                code: "VI"
            }];
    };
    CountryCodeProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], CountryCodeProvider);
    return CountryCodeProvider;
}());

//# sourceMappingURL=country-code.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cordova_oauth_core__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cordova_oauth_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_cordova_oauth_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cordova_oauth_platform_cordova__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cordova_oauth_platform_cordova___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_cordova_oauth_platform_cordova__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__video__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_libphonenumber_js__ = __webpack_require__(550);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var LoginProvider = /** @class */ (function () {
    function LoginProvider(loadingProvider, alertProvider, zone, googlePlus, angularDb, dataProvider, videoProvider) {
        this.loadingProvider = loadingProvider;
        this.alertProvider = alertProvider;
        this.zone = zone;
        this.googlePlus = googlePlus;
        this.angularDb = angularDb;
        this.dataProvider = dataProvider;
        this.videoProvider = videoProvider;
        this.facebookProvider = new __WEBPACK_IMPORTED_MODULE_1_ng2_cordova_oauth_core__["Facebook"]({
            clientId: __WEBPACK_IMPORTED_MODULE_4__login__["a" /* Login */].facebookAppId,
            appScope: ["email"]
        });
        this.phoneNumber = "";
        this.countryCode = "";
        this.oauth = new __WEBPACK_IMPORTED_MODULE_2_ng2_cordova_oauth_platform_cordova__["OauthCordova"]();
        // Detect changes on the Firebase user and redirects the view depending on the user's status.
        // firebase.auth().onAuthStateChanged((user) => {
        //   if (user) {
        //     // Update userData on Database.
        //     // this.angularDb.object('/accounts/' + user.uid).update({
        //     //   isOnline: true
        //     // }).then((success) => {
        //     //
        //     // }).catch((error) => {
        //     //   //this.alertProvider.showErrorMessage('profile/error-update-profile');
        //     // });
        //     if (user["isAnonymous"]) {
        //       //Goto Trial Page.
        //       this.navCtrl.setRoot(Login.trialPage, { animate: false });
        //     } else {
        //       // this.diagnostic.setBluetoothState(true)
        //       // this.diagnostic.getBluetoothState()
        //       // .then((state) => {
        //       //   if (state == this.diagnostic.bluetoothState.POWERED_ON){
        //       //     alert('on')
        //       //     // do something
        //       //   } else {
        //       //     alert('off')
        //       //     // do something else
        //       //   }
        //       // }).catch(e => console.error(e));
        //       if (Login.emailVerification) {
        //         if (user["emailVerified"]) {
        //           //Goto Home Page.
        //           this.zone.run(() => {
        //             //this.navCtrl.setRoot(Login.homePage, { animate: false });
        //           });
        //           //Since we're using a TabsPage an NgZone is required.
        //         } else {
        //           //Goto Verification Page.
        //           // this.navCtrl.setRoot(Login.verificationPage, { animate: false });
        //           //this.navCtrl.setRoot(Login.homePage, { animate: false });
        //         }
        //       } else {
        //         //Goto Home Page.
        //         this.zone.run(() => {
        //          this.navCtrl.setRoot(Login.homePage, { animate: false });
        //         });
        //         //Since we're using a TabsPage an NgZone is required.
        //       }
        //     }
        //   }
        // });
    }
    // Hook this provider up with the navigationController.
    // This is important, so the provider can redirect the app to the views depending
    // on the status of the Firebase user.
    LoginProvider.prototype.setNavController = function (navCtrl) {
        this.navCtrl = navCtrl;
    };
    // Facebook Login, after successful authentication, triggers firebase.auth().onAuthStateChanged((user) on top and
    // redirects the user to its respective views. Make sure to set your FacebookAppId on login.ts
    // and enabled Facebook Login on Firebase app authentication console.
    LoginProvider.prototype.facebookLogin = function () {
        var _this = this;
        this.oauth.logInVia(this.facebookProvider).then(function (success) {
            var credential = __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"].FacebookAuthProvider.credential(success["access_token"]);
            _this.loadingProvider.show();
            __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]()
                .signInWithCredential(credential)
                .then(function (success) {
                _this.loadingProvider.hide();
                _this.createUserData();
            })
                .catch(function (error) {
                _this.loadingProvider.hide();
                var code = error["code"];
                _this.alertProvider.showErrorMessage(code);
            });
        }, function (error) { });
    };
    // Google Login, after successful authentication, triggers firebase.auth().onAuthStateChanged((user) on top and
    // redirects the user to its respective views. Make sure to set your GoogleWebClient Id on login.ts
    // and enabled Google Login on Firebase app authentication console.
    LoginProvider.prototype.googleLogin = function () {
        var _this = this;
        this.loadingProvider.show();
        this.googlePlus
            .login({
            webClientId: __WEBPACK_IMPORTED_MODULE_4__login__["a" /* Login */].googleClientId
        })
            .then(function (success) {
            var credential = __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"].GoogleAuthProvider.credential(success["idToken"], null);
            __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]()
                .signInWithCredential(credential)
                .then(function (success) {
                _this.loadingProvider.hide();
                _this.createUserData();
            })
                .catch(function (error) {
                _this.loadingProvider.hide();
                var code = error["code"];
                _this.alertProvider.showErrorMessage(code);
            });
        }, function (error) {
            _this.loadingProvider.hide();
        });
    };
    // Anonymous Login, after successful authentication, triggers firebase.auth().onAuthStateChanged((user) on top and
    // redirects the user to its respective views. Make sure to enable Anonymous login on Firebase app authentication console.
    LoginProvider.prototype.guestLogin = function () {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]()
            .signInAnonymously()
            .then(function (success) {
            _this.loadingProvider.hide();
            _this.createUserData();
        })
            .catch(function (error) {
            _this.loadingProvider.hide();
            var code = error["code"];
            _this.alertProvider.showErrorMessage(code);
        });
    };
    // Login on Firebase given the email and password.
    LoginProvider.prototype.phoneLogin = function (email, password) {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]()
            .signInWithEmailAndPassword(email, password)
            .then(function (success) {
            _this.loadingProvider.hide();
            _this.phoneNumber = password;
            _this.countryCode = "+" + Object(__WEBPACK_IMPORTED_MODULE_11_libphonenumber_js__["a" /* getPhoneCode */])(Object(__WEBPACK_IMPORTED_MODULE_11_libphonenumber_js__["b" /* parse */])(password).country);
            _this.createUserData();
        })
            .catch(function (error) {
            var code = error["code"];
            if (code == "auth/user-not-found") {
                _this.register(email, password);
            }
            else {
                _this.loadingProvider.hide();
                _this.alertProvider.showErrorMessage(code);
            }
        });
    };
    // Login on Firebase given the email and password.
    LoginProvider.prototype.emailLogin = function (email, password) {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]()
            .signInWithEmailAndPassword(email, password)
            .then(function (success) {
            _this.loadingProvider.hide();
            _this.phoneNumber = "";
            _this.countryCode = "";
            _this.createUserData();
        })
            .catch(function (error) {
            var code = error["code"];
            if (code == "auth/user-not-found") {
                _this.register(email, password);
            }
            else {
                _this.loadingProvider.hide();
                _this.alertProvider.showErrorMessage(code);
            }
        });
    };
    // Register user on Firebase given the email and password.
    LoginProvider.prototype.register = function (email, password) {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]()
            .createUserWithEmailAndPassword(email, password)
            .then(function (success) {
            _this.loadingProvider.hide();
            _this.phoneNumber = password;
            _this.countryCode = "+" + Object(__WEBPACK_IMPORTED_MODULE_11_libphonenumber_js__["a" /* getPhoneCode */])(Object(__WEBPACK_IMPORTED_MODULE_11_libphonenumber_js__["b" /* parse */])(password).country);
            _this.createUserData();
        })
            .catch(function (error) {
            _this.loadingProvider.hide();
            var code = error["code"];
            _this.alertProvider.showErrorMessage(code);
        });
    };
    // Register user on Firebase given the email and password.
    LoginProvider.prototype.emailRegister = function (email, password) {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]()
            .createUserWithEmailAndPassword(email, password)
            .then(function (success) {
            _this.loadingProvider.hide();
            _this.phoneNumber = "";
            _this.countryCode = "";
            _this.createUserData();
        })
            .catch(function (error) {
            _this.loadingProvider.hide();
            var code = error["code"];
            _this.alertProvider.showErrorMessage(code);
        });
    };
    // Send Password Reset Email to the user.
    LoginProvider.prototype.sendPasswordReset = function (email) {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]()
            .sendPasswordResetEmail(email)
            .then(function (success) {
            _this.loadingProvider.hide();
            _this.alertProvider.showPasswordResetMessage(email);
        })
            .catch(function (error) {
            _this.loadingProvider.hide();
            var code = error["code"];
            _this.alertProvider.showErrorMessage(code);
        });
    };
    // Create userData on the database if it doesn't exist yet.
    LoginProvider.prototype.createUserData = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]()
            .ref("accounts/" + __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().currentUser.uid)
            .once("value")
            .then(function (account) {
            // No database data yet, create user data on database
            if (!account.val()) {
                _this.loadingProvider.show();
                var user = __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().currentUser;
                var userId, name, provider, img, email, phoneNumber;
                var providerData = user.providerData[0];
                userId = user.uid;
                // Get name from Firebase user.
                if (user.displayName || providerData.displayName) {
                    name = user.displayName;
                    name = providerData.displayName;
                }
                else {
                    if (_this.phoneNumber) {
                        name = _this.phoneNumber;
                    }
                    else {
                        name = user.email;
                    }
                }
                // Set default username based on name and userId.
                var username = name.replace(/ /g, "") + userId.substring(0, 8);
                // Get provider from Firebase user.
                if (providerData.providerId == "password") {
                    provider = "Firebase";
                }
                else if (providerData.providerId == "facebook.com") {
                    provider = "Facebook";
                }
                else if (providerData.providerId == "google.com") {
                    provider = "Google";
                }
                // Get photoURL from Firebase user.
                if (user.photoURL || providerData.photoURL) {
                    img = user.photoURL;
                    img = providerData.photoURL;
                }
                else {
                    img = "assets/images/profile.png";
                }
                // Get email from Firebase user.
                email = user.email;
                // Set default description.
                var description = "Hello! I am a new Communicaters user.";
                var uniqueId = Math.floor(Math.random() * 10000000000);
                var tempData_1 = {
                    userId: userId,
                    name: name,
                    username: username,
                    provider: provider,
                    img: img,
                    email: email,
                    description: description,
                    uniqueId: uniqueId,
                    isOnline: true,
                    dateCreated: new Date().toString(),
                    phoneNumber: _this.phoneNumber,
                    countryCode: _this.countryCode
                };
                // Insert data on our database using AngularFire.
                _this.angularDb
                    .object("/accounts/" + userId)
                    .set(tempData_1)
                    .then(function () {
                    _this.loadingProvider.hide();
                    _this.videoProvider.InitializingRTC(tempData_1);
                    _this.dataProvider.setData("userData", tempData_1);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login__["a" /* Login */].homePage, { animate: false });
                });
            }
            else {
                var _userData = account.val();
                if (_userData.userId) {
                    _this.angularDb
                        .object("/accounts/" + _userData.userId)
                        .update({
                        isOnline: true
                    })
                        .then(function (success) { })
                        .catch(function (error) {
                        //this.alertProvider.showErrorMessage('profile/error-update-profile');
                    });
                }
                if (!_userData.isBlock) {
                    _this.videoProvider.InitializingRTC(account.val());
                    _this.dataProvider.setData("userData", account.val());
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login__["a" /* Login */].homePage, { animate: false });
                }
                else {
                    _this.alertProvider.showAlert("Login Failed", "You are temporary block. please contact to ionSocial team ");
                }
            }
        });
    };
    LoginProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_6__alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_9__data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_10__video__["a" /* VideoProvider */]])
    ], LoginProvider);
    return LoginProvider;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_logout__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_image__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__validator__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__update_contact_update_contact__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__users_users__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__reported_post_reported_post__ = __webpack_require__(176);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var HomePage = /** @class */ (function () {
    // HomePage
    // This is the page where the user is directed after successful login and email is confirmed.
    // A couple of profile management function is available for the user in this page such as:
    // Change name, profile pic, email, and password
    // The user can also opt for the deletion of their account, and finally logout.
    function HomePage(navCtrl, alertCtrl, navParams, app, logoutProvider, modalCtrl, loadingProvider, imageProvider, angularDb, alertProvider, dataProvider, camera) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.app = app;
        this.logoutProvider = logoutProvider;
        this.modalCtrl = modalCtrl;
        this.loadingProvider = loadingProvider;
        this.imageProvider = imageProvider;
        this.angularDb = angularDb;
        this.alertProvider = alertProvider;
        this.dataProvider = dataProvider;
        this.camera = camera;
        this.logoutProvider.setApp(this.app);
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Observe the userData on database to be used by our markup html.
        // Whenever the userData on the database is updated, it will automatically reflect on our user variable.
        // this.loadingProvider.show();
        this.dataProvider.getCurrentUser().subscribe(function (user) {
            // this.loadingProvider.hide();
            _this.user = user;
            console.log(" user", _this.user);
        });
    };
    HomePage.prototype.sendfeedback = function () {
        window.open("mailto:mayorainfotech@gmail.com?Subject=SendFeedBack", "_system");
        // window.open(`mailto:nakulkundaliya12@gmail.com?Subject=SendFeedBack`, '_system');
    };
    // Change user's profile photo. Uses imageProvider to process image and upload on Firebase and update userData.
    HomePage.prototype.setPhoto = function () {
        var _this = this;
        // Ask if the user wants to take a photo or choose from photo gallery.
        this.alert = this.alertCtrl
            .create({
            title: "Set Profile Photo",
            message: "Do you want to take a photo or choose from your photo gallery?",
            buttons: [
                {
                    text: "Cancel",
                    handler: function (data) { }
                },
                {
                    text: "Choose from Gallery",
                    handler: function () {
                        // Call imageProvider to process, upload, and update user photo.
                        _this.imageProvider.setProfilePhoto(_this.user, _this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: "Take Photo",
                    handler: function () {
                        // Call imageProvider to process, upload, and update user photo.
                        _this.imageProvider.setProfilePhoto(_this.user, _this.camera.PictureSourceType.CAMERA);
                    }
                }
            ]
        })
            .present();
    };
    // Change user's profile name, username, and description.
    HomePage.prototype.setName = function () {
        var _this = this;
        this.alert = this.alertCtrl
            .create({
            title: "Change Profile Name",
            message: "Please enter a new profile name.",
            inputs: [
                {
                    name: "name",
                    placeholder: "Your Name",
                    value: this.user.name
                }
            ],
            buttons: [
                {
                    text: "Cancel",
                    handler: function (data) { }
                },
                {
                    text: "Save",
                    handler: function (data) {
                        var name = data["name"];
                        // Check if entered name is different from the current name
                        if (_this.user.name != name) {
                            // Check if name's length is more than five characters
                            if (name.length >= __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileNameValidator.minLength) {
                                // Check if name contains characters and numbers only.
                                if (__WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileNameValidator.pattern.test(name)) {
                                    _this.loadingProvider.show();
                                    var profile = {
                                        displayName: name,
                                        photoURL: _this.user.photoURL
                                    };
                                    // Update profile on Firebase
                                    __WEBPACK_IMPORTED_MODULE_13_firebase__["auth"]()
                                        .currentUser.updateProfile(profile)
                                        .then(function (success) {
                                        // Update userData on Database.
                                        _this.angularDb
                                            .object("/accounts/" + _this.user.userId)
                                            .update({
                                            name: name
                                        })
                                            .then(function (success) {
                                            __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileNameValidator.pattern.test(name); //Refresh validator
                                            _this.alertProvider.showProfileUpdatedMessage();
                                        })
                                            .catch(function (error) {
                                            _this.alertProvider.showErrorMessage("profile/error-update-profile");
                                        });
                                    })
                                        .catch(function (error) {
                                        // Show error
                                        _this.loadingProvider.hide();
                                        var code = error["code"];
                                        _this.alertProvider.showErrorMessage(code);
                                        if (code == "auth/requires-recent-login") {
                                            _this.logoutProvider.logout().then(function (res) {
                                                AccountKitPlugin.logout();
                                                _this.navCtrl.parent.parent.setRoot(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                                            });
                                        }
                                    });
                                }
                                else {
                                    _this.alertProvider.showErrorMessage("profile/invalid-chars-name");
                                }
                            }
                            else {
                                _this.alertProvider.showErrorMessage("profile/name-too-short");
                            }
                        }
                    }
                }
            ]
        })
            .present();
    };
    //Set username
    HomePage.prototype.setUsername = function () {
        var _this = this;
        this.alert = this.alertCtrl
            .create({
            title: "Change Username",
            message: "Please enter a new username.",
            inputs: [
                {
                    name: "username",
                    placeholder: "Your Username",
                    value: this.user.username
                }
            ],
            buttons: [
                {
                    text: "Cancel",
                    handler: function (data) { }
                },
                {
                    text: "Save",
                    handler: function (data) {
                        var username = data["username"];
                        // Check if entered username is different from the current username
                        if (_this.user.username != username) {
                            _this.dataProvider
                                .getUserWithUsername(username)
                                .take(1)
                                .subscribe(function (userList) {
                                if (userList.length > 0) {
                                    _this.alertProvider.showErrorMessage("profile/error-same-username");
                                }
                                else {
                                    _this.angularDb
                                        .object("/accounts/" + _this.user.userId)
                                        .update({
                                        username: username
                                    })
                                        .then(function (success) {
                                        _this.alertProvider.showProfileUpdatedMessage();
                                    })
                                        .catch(function (error) {
                                        _this.alertProvider.showErrorMessage("profile/error-update-profile");
                                    });
                                }
                            });
                        }
                    }
                }
            ]
        })
            .present();
    };
    //Set username
    HomePage.prototype.setPhoneNumber = function () {
        var _this = this;
        this.alert = this.alertCtrl
            .create({
            title: "Change Phonenumber",
            message: "Please enter a Phone number.",
            inputs: [
                {
                    name: "phonenumber",
                    placeholder: "Phone number( with country code )",
                    value: this.user.phoneNumber
                }
            ],
            buttons: [
                {
                    text: "Cancel",
                    handler: function (data) { }
                },
                {
                    text: "Save",
                    handler: function (data) {
                        var phoneNumber = data["phonenumber"];
                        // Check if entered username is different from the current username
                        if (_this.user.phoneNumber != phoneNumber) {
                            _this.dataProvider
                                .getUserWithPhonenumber(phoneNumber)
                                .take(1)
                                .subscribe(function (userList) {
                                if (userList.length > 0) {
                                    _this.alertProvider.showErrorMessage("profile/error-same-phoneNumber");
                                }
                                else {
                                    _this.angularDb
                                        .object("/accounts/" + _this.user.userId)
                                        .update({
                                        phoneNumber: phoneNumber
                                    })
                                        .then(function (success) {
                                        _this.alertProvider.showPhoneNumberUpdatedMessage();
                                    })
                                        .catch(function (error) {
                                        _this.alertProvider.showErrorMessage("profile/error-update-profile");
                                    });
                                }
                            });
                        }
                    }
                }
            ]
        })
            .present();
    };
    // updateContact number
    HomePage.prototype.updateContactNumber = function () {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__update_contact_update_contact__["a" /* UpdateContactPage */], {
            userData: this.user
        });
        profileModal.present();
    };
    HomePage.prototype.loginCallback = function (response) {
        alert(response);
    };
    //Set description
    HomePage.prototype.setDescription = function () {
        var _this = this;
        this.alert = this.alertCtrl
            .create({
            title: "Change Description",
            message: "Please enter a new description.",
            inputs: [
                {
                    name: "description",
                    placeholder: "Your Description",
                    value: this.user.description
                }
            ],
            buttons: [
                {
                    text: "Cancel",
                    handler: function (data) { }
                },
                {
                    text: "Save",
                    handler: function (data) {
                        var description = data["description"];
                        // Check if entered description is different from the current description
                        if (_this.user.description != description) {
                            _this.angularDb
                                .object("/accounts/" + _this.user.userId)
                                .update({
                                description: description
                            })
                                .then(function (success) {
                                _this.alertProvider.showProfileUpdatedMessage();
                            })
                                .catch(function (error) {
                                _this.alertProvider.showErrorMessage("profile/error-update-profile");
                            });
                        }
                    }
                }
            ]
        })
            .present();
    };
    // Change user's email. Uses Validator.ts to validate the entered email. After, update the userData on database.
    // When the user changed their email, they have to confirm the new email address.
    HomePage.prototype.setEmail = function () {
        var _this = this;
        this.alert = this.alertCtrl
            .create({
            title: "Change Email Address",
            message: "Please enter a new email address.",
            inputs: [
                {
                    name: "email",
                    placeholder: "Your Email Address",
                    value: this.user.email
                }
            ],
            buttons: [
                {
                    text: "Cancel",
                    handler: function (data) { }
                },
                {
                    text: "Save",
                    handler: function (data) {
                        var email = data["email"];
                        //Check if entered email is different from the current email
                        if (_this.user.email != email) {
                            //Check if email is valid.
                            if (__WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileEmailValidator.pattern.test(email)) {
                                _this.loadingProvider.show();
                                // Update email on Firebase.
                                __WEBPACK_IMPORTED_MODULE_13_firebase__["auth"]()
                                    .currentUser.updateEmail(email)
                                    .then(function (success) {
                                    // Update userData on Database.
                                    _this.angularDb
                                        .object("/accounts/" + _this.user.userId)
                                        .update({
                                        email: email
                                    })
                                        .then(function (success) {
                                        __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileEmailValidator.pattern.test(email);
                                        // Check if emailVerification is enabled, if it is go to verificationPage.
                                        if (__WEBPACK_IMPORTED_MODULE_12__login__["a" /* Login */].emailVerification) {
                                            if (!__WEBPACK_IMPORTED_MODULE_13_firebase__["auth"]().currentUser.emailVerified) {
                                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_12__login__["a" /* Login */].verificationPage);
                                            }
                                        }
                                    })
                                        .catch(function (error) {
                                        _this.alertProvider.showErrorMessage("profile/error-change-email");
                                    });
                                })
                                    .catch(function (error) {
                                    //Show error
                                    _this.loadingProvider.hide();
                                    var code = error["code"];
                                    _this.alertProvider.showErrorMessage(code);
                                    if (code == "auth/requires-recent-login") {
                                        _this.logoutProvider.logout().then(function (res) {
                                            _this.dataProvider.clearData();
                                            AccountKitPlugin.logout();
                                            _this.navCtrl.parent.parent.setRoot(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                                        });
                                    }
                                });
                            }
                            else {
                                _this.alertProvider.showErrorMessage("profile/invalid-email");
                            }
                        }
                    }
                }
            ]
        })
            .present();
    };
    // Change user's password, this option only shows up for users registered via Firebase.
    // The currentPassword is first checked, after which the new password should be entered twice.
    // Uses password validator from Validator.ts.
    HomePage.prototype.setPassword = function () {
        var _this = this;
        this.alert = this.alertCtrl
            .create({
            title: "Change Password",
            message: "Please enter a new password.",
            inputs: [
                {
                    name: "currentPassword",
                    placeholder: "Current Password",
                    type: "password"
                },
                {
                    name: "password",
                    placeholder: "New Password",
                    type: "password"
                },
                {
                    name: "confirmPassword",
                    placeholder: "Confirm Password",
                    type: "password"
                }
            ],
            buttons: [
                {
                    text: "Cancel",
                    handler: function (data) { }
                },
                {
                    text: "Save",
                    handler: function (data) {
                        var currentPassword = data["currentPassword"];
                        var credential = __WEBPACK_IMPORTED_MODULE_13_firebase__["auth"].EmailAuthProvider.credential(_this.user.email, currentPassword);
                        // Check if currentPassword entered is correct
                        _this.loadingProvider.show();
                        __WEBPACK_IMPORTED_MODULE_13_firebase__["auth"]()
                            .currentUser.reauthenticate(credential)
                            .then(function (success) {
                            var password = data["password"];
                            // Check if entered password is not the same as the currentPassword
                            if (password != currentPassword) {
                                if (password.length >=
                                    __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profilePasswordValidator.minLength) {
                                    if (__WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profilePasswordValidator.pattern.test(password)) {
                                        if (password == data["confirmPassword"]) {
                                            // Update password on Firebase.
                                            __WEBPACK_IMPORTED_MODULE_13_firebase__["auth"]()
                                                .currentUser.updatePassword(password)
                                                .then(function (success) {
                                                _this.loadingProvider.hide();
                                                __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profilePasswordValidator.pattern.test(password);
                                                _this.alertProvider.showPasswordChangedMessage();
                                            })
                                                .catch(function (error) {
                                                _this.loadingProvider.hide();
                                                var code = error["code"];
                                                _this.alertProvider.showErrorMessage(code);
                                                if (code == "auth/requires-recent-login") {
                                                    _this.logoutProvider.logout().then(function (res) {
                                                        _this.dataProvider.clearData();
                                                        AccountKitPlugin.logout();
                                                        _this.navCtrl.parent.parent.setRoot(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                                                    });
                                                }
                                            });
                                        }
                                        else {
                                            _this.alertProvider.showErrorMessage("profile/passwords-do-not-match");
                                        }
                                    }
                                    else {
                                        _this.alertProvider.showErrorMessage("profile/invalid-chars-password");
                                    }
                                }
                                else {
                                    _this.alertProvider.showErrorMessage("profile/password-too-short");
                                }
                            }
                        })
                            .catch(function (error) {
                            //Show error
                            _this.loadingProvider.hide();
                            var code = error["code"];
                            _this.alertProvider.showErrorMessage(code);
                        });
                    }
                }
            ]
        })
            .present();
    };
    // Delete the user account. After deleting the Firebase user, the userData along with their profile pic uploaded on the storage will be deleted as well.
    // If you added some other info or traces for the account, make sure to account for them when deleting the account.
    HomePage.prototype.deleteAccount = function () {
        var _this = this;
        this.alert = this.alertCtrl
            .create({
            title: "Confirm Delete",
            message: "Are you sure you want to delete your account? This cannot be undone.",
            buttons: [
                {
                    text: "Cancel"
                },
                {
                    text: "Delete",
                    handler: function (data) {
                        _this.loadingProvider.show();
                        // Delete Firebase user
                        __WEBPACK_IMPORTED_MODULE_13_firebase__["auth"]()
                            .currentUser.delete()
                            .then(function (success) {
                            // Delete profilePic of user on Firebase storage
                            _this.imageProvider.deleteUserImageFile(_this.user);
                            // Delete user data on Database
                            _this.angularDb
                                .object("/accounts/" + _this.user.userId)
                                .remove()
                                .then(function () {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showAccountDeletedMessage();
                                _this.logoutProvider.logout().then(function (res) {
                                    AccountKitPlugin.logout();
                                    _this.navCtrl.parent.parent.setRoot(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                                });
                            });
                        })
                            .catch(function (error) {
                            _this.loadingProvider.hide();
                            var code = error["code"];
                            _this.alertProvider.showErrorMessage(code);
                            if (code == "auth/requires-recent-login") {
                                _this.logoutProvider.logout().then(function (res) {
                                    _this.dataProvider.clearData();
                                    _this.navCtrl.parent.parent.setRoot(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                                });
                            }
                        });
                    }
                }
            ]
        })
            .present();
    };
    // Log the user out.
    HomePage.prototype.logout = function () {
        var _this = this;
        this.alert = this.alertCtrl
            .create({
            title: "Confirm Logout",
            message: "Are you sure you want to logout?",
            buttons: [
                {
                    text: "Cancel"
                },
                {
                    text: "Logout",
                    handler: function (data) {
                        _this.logoutProvider.logout().then(function (res) {
                            _this.dataProvider.clearData();
                            AccountKitPlugin.logout();
                            _this.navCtrl.parent.parent.setRoot(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                        });
                    }
                }
            ]
        })
            .present();
    };
    HomePage.prototype.reportedPost = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__reported_post_reported_post__["a" /* ReportedPostPage */]);
    };
    HomePage.prototype.users = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__users_users__["a" /* UsersPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "page-home",template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div *ngIf="user">\n    <div class="profile">\n      <img src="{{user.img}}" tappable (click)="setPhoto()" />\n    </div>\n    <!-- Show icon of logged in provider -->\n    <h4>\n      <span tappable (click)="setName()" class="username">{{user.name}} </span>\n      <ion-icon name="md-flame" *ngIf="user.provider == \'Firebase\'" class="firebase"></ion-icon>\n      <ion-icon name="logo-facebook" *ngIf="user.provider == \'Facebook\'" class="facebook"></ion-icon>\n      <ion-icon name="logo-google" *ngIf="user.provider == \'Google\'" class="google"></ion-icon>\n    </h4>\n    <p tappable (click)="setUsername()" class="username">@{{user.username}}</p>\n    <p tappable (click)="setDescription()" class="description">{{user.description}}</p>\n    <!-- Profile Menu -->\n    <ion-list>\n      <ion-item no-lines tappable (click)="setName()">\n        Set Profile Name\n        <ion-icon name="md-contact" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="setUsername()">\n        Set Username\n        <ion-icon name="md-at" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="setDescription()">\n        Set Description\n        <ion-icon name="md-clipboard" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="setPhoto()">\n        Set Profile Photo\n        <ion-icon name="ios-camera" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="setEmail()">\n        Change Email Address\n        <ion-icon name="md-mail-open" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="updateContactNumber()">\n        Change Phone number\n        <ion-icon name="md-call" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="setPassword()" *ngIf="user && user.provider == \'Firebase\'">\n        Change Password\n        <ion-icon name="md-key" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="reportedPost()" *ngIf="user && user.isAdmin == true">\n        Reported Post\n        <ion-icon name="md-book" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="users()" *ngIf="user && user.isAdmin == true">\n        User list\n        <ion-icon name="md-book" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="sendfeedback()">\n        <!-- href="mailto:nakulkundaliya12@com.com?Subject=SendFeedBack" target="_top"-->\n        Send Feedback\n        <ion-icon name="md-paper" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="deleteAccount()">\n        Delete Account\n        <ion-icon name="md-trash" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="logout()">\n        Logout\n        <ion-icon name="md-log-out" item-right></ion-icon>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__providers_logout__["a" /* LogoutProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_image__["a" /* ImageProvider */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__["a" /* Camera */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__new_message_new_message__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__message_message__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MessagesPage = /** @class */ (function () {
    // MessagesPage
    // This is the page where the user can see their current conversations with their friends.
    // The user can also start a new conversation.
    function MessagesPage(navCtrl, navParams, angularDb, loadingProvider, app, dataProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.angularDb = angularDb;
        this.loadingProvider = loadingProvider;
        this.app = app;
        this.dataProvider = dataProvider;
    }
    MessagesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Create userData on the database if it doesn't exist yet.
        this.searchFriend = '';
        this.loadingProvider.show();
        // Get info of conversations of current logged in user.
        this.dataProvider.getConversations().subscribe(function (conversations) {
            if (conversations.length > 0) {
                conversations.forEach(function (conversation) {
                    if (conversation.$exists()) {
                        // Get conversation partner info.
                        _this.dataProvider.getUser(conversation.$key).subscribe(function (user) {
                            conversation.friend = user;
                            // Get conversation info.
                            _this.dataProvider.getConversation(conversation.conversationId).subscribe(function (obj) {
                                // Get last message of conversation.
                                var lastMessage = obj.messages[obj.messages.length - 1];
                                conversation.date = lastMessage.date;
                                conversation.sender = lastMessage.sender;
                                // Set unreadMessagesCount
                                conversation.unreadMessagesCount = obj.messages.length - conversation.messagesRead;
                                // Process last message depending on messageType.
                                if (lastMessage.type == 'text') {
                                    if (lastMessage.sender == __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid) {
                                        conversation.message = 'You: ' + lastMessage.message;
                                    }
                                    else {
                                        conversation.message = lastMessage.message;
                                    }
                                }
                                else if (lastMessage.type == 'audio') {
                                    if (lastMessage.sender == __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid) {
                                        conversation.message = 'You sent a audio message.';
                                    }
                                    else {
                                        conversation.message = 'has sent you a audio message.';
                                    }
                                }
                                else {
                                    if (lastMessage.sender == __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid) {
                                        conversation.message = 'You sent a photo message.';
                                    }
                                    else {
                                        conversation.message = 'has sent you a photo message.';
                                    }
                                }
                                // Add or update conversation.
                                _this.addOrUpdateConversation(conversation);
                            });
                        });
                    }
                });
                _this.loadingProvider.hide();
            }
            else {
                _this.conversations = [];
                _this.loadingProvider.hide();
            }
        });
        // Update conversations' last active date time elapsed every minute based on Moment.js.
        var that = this;
        if (!that.updateDateTime) {
            that.updateDateTime = setInterval(function () {
                if (that.conversations) {
                    that.conversations.forEach(function (conversation) {
                        var date = conversation.date;
                        conversation.date = new Date(date);
                    });
                }
            }, 60000);
        }
    };
    // Add or update conversation for real-time sync based on our observer, sort by active date.
    MessagesPage.prototype.addOrUpdateConversation = function (conversation) {
        if (!this.conversations) {
            this.conversations = [conversation];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.conversations.length; i++) {
                if (this.conversations[i].$key == conversation.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.conversations[index] = conversation;
            }
            else {
                this.conversations.push(conversation);
            }
            // Sort by last active date.
            this.conversations.sort(function (a, b) {
                var date1 = new Date(a.date);
                var date2 = new Date(b.date);
                if (date1 > date2) {
                    return -1;
                }
                else if (date1 < date2) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
    };
    // New conversation.
    MessagesPage.prototype.newMessage = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__new_message_new_message__["a" /* NewMessagePage */]);
    };
    // Open chat with friend.
    MessagesPage.prototype.message = function (userId) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__message_message__["a" /* MessagePage */], { userId: userId });
    };
    // Return class based if conversation has unreadMessages or not.
    MessagesPage.prototype.hasUnreadMessages = function (conversation) {
        if (conversation.unreadMessagesCount > 0) {
            return 'bold';
        }
        else
            return '';
    };
    MessagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-messages',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/messages/messages.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Messages</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only tappable (click)="newMessage()"><ion-icon name="ios-create"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!-- No conversations to show -->\n  <div class="empty-list" *ngIf="conversations && conversations.length <= 0">\n    <h1><ion-icon name="md-text"></ion-icon></h1>\n    <p>Uh-oh! You are not part of any conversation yet.</p>\n    <button ion-button icon-left tappable (click)="newMessage()"><ion-icon name="md-add"></ion-icon>New Conversation</button>\n  </div>\n  <!-- Show conversations -->\n  <ion-list class="avatar-list" *ngIf="conversations && conversations.length > 0">\n    <ion-searchbar [(ngModel)]="searchFriend" placeholder="Search for friend or username" showCancelButton="true" cancelButtonText="Done"></ion-searchbar>\n    <ion-item *ngFor="let conversation of conversations | conversationFilter:searchFriend" no-lines tappable (click)="message(conversation.$key)">\n      <ion-avatar item-left *ngIf="conversation.friend">\n        <ion-icon name="radio-button-on" class="online" [ngClass]="conversation.friend.isOnline?\'isOnline\' : \'isOffline\'"></ion-icon>\n        <img src="{{conversation.friend.img}}">\n      </ion-avatar>\n      <div [ngClass]=hasUnreadMessages(conversation)>\n        <h2 *ngIf="conversation.friend">  {{conversation.friend.name}}</h2>\n        <ion-badge color="danger" *ngIf="conversation.unreadMessagesCount > 0">{{conversation.unreadMessagesCount}}</ion-badge>\n        <p>\n       \n        {{conversation.message}} <br />\n        <span>{{conversation.date | DateFormat}}</span>\n\n        </p>\n        \n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/messages/messages.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__providers_data__["a" /* DataProvider */]])
    ], MessagesPage);
    return MessagesPage;
}());

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewMessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_people_search_people__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__message_message__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_loading__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NewMessagePage = /** @class */ (function () {
    // NewMessagePage
    // This is the page where the user are asked to select a friend whom they want to start a conversation with.
    function NewMessagePage(navCtrl, navParams, app, dataProvider, loadingProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
    }
    NewMessagePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Initialize
        this.searchFriend = '';
        this.loadingProvider.show();
        // Get user's friends.
        this.dataProvider.getCurrentUser().subscribe(function (account) {
            if (account.friends) {
                for (var i = 0; i < account.friends.length; i++) {
                    _this.dataProvider.getUser(account.friends[i]).subscribe(function (friend) {
                        _this.addOrUpdateFriend(friend);
                    });
                }
            }
            else {
                _this.friends = [];
            }
            _this.loadingProvider.hide();
        });
    };
    // Back
    NewMessagePage.prototype.back = function () {
        this.navCtrl.pop();
    };
    // Add or update friend for real-time sync.
    NewMessagePage.prototype.addOrUpdateFriend = function (friend) {
        if (!this.friends) {
            this.friends = [friend];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friends.length; i++) {
                if (this.friends[i].$key == friend.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.friends[index] = friend;
            }
            else {
                this.friends.push(friend);
            }
        }
    };
    // Search people.
    NewMessagePage.prototype.searchPeople = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__search_people_search_people__["a" /* SearchPeoplePage */]);
    };
    // Open chat with this user.
    NewMessagePage.prototype.message = function (userId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__message_message__["a" /* MessagePage */], { userId: userId });
    };
    NewMessagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-new-message',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/new-message/new-message.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <ion-buttons>\n      <button ion-button tappable (click)="back()">Back</button>\n    </ion-buttons>\n    <ion-title>New Message</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!-- No friends yet to start a conversation with -->\n  <div class="empty-list" *ngIf="friends && friends.length == 0">\n    <h1><ion-icon name="md-contacts"></ion-icon></h1>\n    <p>Uh-oh! You have not added any friends yet.</p>\n    <button ion-button icon-left tappable (click)="searchPeople()"><ion-icon name="md-search"></ion-icon>Search People</button>\n  </div>\n  <!-- Show friends to start a conversation with -->\n  <ion-list class="avatar-list" *ngIf="friends && friends.length > 0">\n    <ion-searchbar [(ngModel)]="searchFriend" placeholder="Search for friend or username" showCancelButton="true" cancelButtonText="Done"></ion-searchbar>\n    <ion-item *ngFor="let friend of friends | friendFilter:searchFriend" no-lines tappable (click)="message(friend.$key)">\n      <ion-avatar item-left>\n        <ion-icon name="radio-button-on" class="online" [ngClass]="friend.isOnline?\'isOnline\' : \'isOffline\'"></ion-icon>\n        <img src="{{friend.img}}">\n      </ion-avatar>\n      <h2>{{friend.name}}</h2>\n      <p>@{{friend.username}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/new-message/new-message.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_loading__["a" /* LoadingProvider */]])
    ], NewMessagePage);
    return NewMessagePage;
}());

//# sourceMappingURL=new-message.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_group_new_group__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__group_group__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GroupsPage = /** @class */ (function () {
    // GroupsPage
    // This is the page where the user can add, view and search for groups.
    function GroupsPage(navCtrl, navParams, app, dataProvider, loadingProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
    }
    GroupsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Initialize
        this.searchGroup = '';
        this.loadingProvider.show();
        // Get groups
        this.dataProvider.getGroups().subscribe(function (groupIds) {
            if (groupIds.length > 0) {
                if (_this.groups && _this.groups.length > groupIds.length) {
                    // User left/deleted a group, clear the list and add or update each group again.
                    _this.groups = [];
                }
                groupIds.forEach(function (groupId) {
                    _this.dataProvider.getGroup(groupId.$key).subscribe(function (group) {
                        if (group.$exists()) {
                            if (group.messages) {
                                // Get group's unreadMessagesCount
                                group.unreadMessagesCount = group.messages.length - groupId.messagesRead;
                                // Get group's last active date
                                group.date = group.messages[group.messages.length - 1].date;
                            }
                            _this.addOrUpdateGroup(group);
                        }
                    });
                });
                _this.loadingProvider.hide();
            }
            else {
                _this.groups = [];
                _this.loadingProvider.hide();
            }
        });
        // Update groups' last active date time elapsed every minute based on Moment.js.
        var that = this;
        if (!that.updateDateTime) {
            that.updateDateTime = setInterval(function () {
                if (that.groups) {
                    that.groups.forEach(function (group) {
                        var date = group.date;
                        group.date = new Date(date);
                    });
                }
            }, 60000);
        }
    };
    // Add or update group for real-time sync based on our observer.
    GroupsPage.prototype.addOrUpdateGroup = function (group) {
        if (!this.groups) {
            this.groups = [group];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].$key == group.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.groups[index] = group;
            }
            else {
                this.groups.push(group);
            }
        }
    };
    // Remove group, because group has already been deleted.
    // removeGroup(group) {
    //   if (this.groups) {
    //     var index = -1;
    //     for (var i = 0; i < this.groups.length; i++) {
    //       if (this.groups[i].$key == group.$key) {
    //         index = i;
    //       }
    //     }
    //     if (index > -1) {
    //       this.groups.splice(index, 1);
    //     }
    //   }
    // }
    // New Group.
    GroupsPage.prototype.newGroup = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__new_group_new_group__["a" /* NewGroupPage */]);
    };
    // Open Group Chat.
    GroupsPage.prototype.viewGroup = function (groupId) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__group_group__["a" /* GroupPage */], { groupId: groupId });
    };
    // Return class based if group has unreadMessages or not.
    GroupsPage.prototype.hasUnreadMessages = function (group) {
        if (group.unreadMessagesCount > 0) {
            return 'group bold';
        }
        else
            return 'group';
    };
    GroupsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-groups',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/groups/groups.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Groups</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only tappable (click)="newGroup()"><ion-icon name="md-add"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!-- No groups to show -->\n  <div class="empty-list" *ngIf="groups && groups.length <= 0">\n    <h1><ion-icon name="md-chatbubbles"></ion-icon></h1>\n    <p>Uh-oh! You are not part of any groups yet.</p>\n    <button ion-button icon-left tappable (click)="newGroup()"><ion-icon name="md-add"></ion-icon>Create Group</button>\n  </div>\n  <!-- Show groups -->\n  <div *ngIf="groups && groups.length > 0">\n    <ion-searchbar [(ngModel)]="searchGroup" placeholder="Search for group" showCancelButton="true" cancelButtonText="Done"></ion-searchbar>\n    <div *ngFor="let group of groups | groupFilter: searchGroup">\n      <ion-col col-6 (click)="viewGroup(group.$key)" tappable>\n        <div [ngClass]=hasUnreadMessages(group)>\n          <img src="{{group.img}}" />\n          <ion-badge color="danger" *ngIf="group.unreadMessagesCount > 0">{{group.unreadMessagesCount}}</ion-badge>\n          <p>{{group.name}} <br/>\n          <span>{{group.date | DateFormat}}</span>\n          </p>\n          \n        </div>\n      </ion-col>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/groups/groups.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_3__providers_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_loading__["a" /* LoadingProvider */]])
    ], GroupsPage);
    return GroupsPage;
}());

//# sourceMappingURL=groups.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewGroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_image__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__validator__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__group_group__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__search_people_search_people__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var NewGroupPage = /** @class */ (function () {
    // NewGroupPage
    // This is the page where the user can start a new group chat with their friends.
    function NewGroupPage(navCtrl, navParams, imageProvider, dataProvider, formBuilder, alertProvider, alertCtrl, angularDb, app, loadingProvider, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.imageProvider = imageProvider;
        this.dataProvider = dataProvider;
        this.formBuilder = formBuilder;
        this.alertProvider = alertProvider;
        this.alertCtrl = alertCtrl;
        this.angularDb = angularDb;
        this.app = app;
        this.loadingProvider = loadingProvider;
        this.camera = camera;
        // Create our groupForm based on Validator.ts
        this.groupForm = formBuilder.group({
            name: __WEBPACK_IMPORTED_MODULE_7__validator__["a" /* Validator */].groupNameValidator,
            description: __WEBPACK_IMPORTED_MODULE_7__validator__["a" /* Validator */].groupDescriptionValidator
        });
    }
    NewGroupPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Initialize
        this.group = {
            img: ''
        };
        this.searchFriend = '';
        // Get user's friends to add to the group.
        this.dataProvider.getCurrentUser().subscribe(function (account) {
            if (!_this.groupMembers) {
                _this.groupMembers = [account];
            }
            if (account.friends) {
                for (var i = 0; i < account.friends.length; i++) {
                    _this.dataProvider.getUser(account.friends[i]).subscribe(function (friend) {
                        _this.addOrUpdateFriend(friend);
                    });
                }
            }
            else {
                _this.friends = [];
            }
        });
    };
    // Add or update friend for real-time sync.
    NewGroupPage.prototype.addOrUpdateFriend = function (friend) {
        if (!this.friends) {
            this.friends = [friend];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friends.length; i++) {
                if (this.friends[i].$key == friend.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.friends[index] = friend;
            }
            else {
                this.friends.push(friend);
            }
        }
    };
    // Back
    NewGroupPage.prototype.back = function () {
        if (this.group)
            this.imageProvider.deleteImageFile(this.group.img);
        this.navCtrl.pop();
    };
    // Proceed with group creation.
    NewGroupPage.prototype.done = function () {
        var _this = this;
        this.loadingProvider.show();
        var messages = [];
        // Add system message that group is created.
        messages.push({
            date: new Date().toString(),
            sender: __WEBPACK_IMPORTED_MODULE_11_firebase__["auth"]().currentUser.uid,
            type: 'system',
            message: 'This group has been created.',
            icon: 'md-chatbubbles'
        });
        // Add members of the group.
        var members = [];
        for (var i = 0; i < this.groupMembers.length; i++) {
            members.push(this.groupMembers[i].$key);
        }
        // Add group info and date.
        this.group.dateCreated = new Date().toString();
        this.group.messages = messages;
        this.group.members = members;
        this.group.name = this.groupForm.value["name"];
        this.group.description = this.groupForm.value["description"];
        this.group.admin = [__WEBPACK_IMPORTED_MODULE_11_firebase__["auth"]().currentUser.uid];
        // Add group to database.
        this.angularDb.list('groups').push(this.group).then(function (success) {
            var groupId = success.key;
            // Add group reference to users.
            _this.angularDb.object('/accounts/' + _this.groupMembers[0].$key + '/groups/' + groupId).update({
                messagesRead: 1
            });
            for (var i = 1; i < _this.groupMembers.length; i++) {
                _this.angularDb.object('/accounts/' + _this.groupMembers[i].$key + '/groups/' + groupId).update({
                    messagesRead: 0
                });
            }
            // Open the group chat of the just created group.
            _this.navCtrl.popToRoot().then(function () {
                _this.loadingProvider.hide();
                _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_10__group_group__["a" /* GroupPage */], { groupId: groupId });
            });
        });
    };
    // Add friend to members of group.
    NewGroupPage.prototype.addToGroup = function (friend) {
        this.groupMembers.push(friend);
    };
    // Remove friend from members of group.
    NewGroupPage.prototype.removeFromGroup = function (friend) {
        var index = -1;
        for (var i = 1; i < this.groupMembers.length; i++) {
            if (this.groupMembers[i].$key == friend.$key) {
                index = i;
            }
        }
        if (index > -1) {
            this.groupMembers.splice(index, 1);
        }
    };
    // Check if friend is already added to the group or not.
    NewGroupPage.prototype.inGroup = function (friend) {
        for (var i = 0; i < this.groupMembers.length; i++) {
            if (this.groupMembers[i].$key == friend.$key) {
                return true;
            }
        }
        return false;
    };
    // Toggle to add/remove friend from the group.
    NewGroupPage.prototype.addOrRemoveFromGroup = function (friend) {
        if (this.inGroup(friend)) {
            this.removeFromGroup(friend);
        }
        else {
            this.addToGroup(friend);
        }
    };
    // Set group photo.
    NewGroupPage.prototype.setGroupPhoto = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Set Group Photo',
            message: 'Do you want to take a photo or choose from your photo gallery?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Choose from Gallery',
                    handler: function () {
                        _this.imageProvider.setGroupPhoto(_this.group, _this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Take Photo',
                    handler: function () {
                        _this.imageProvider.setGroupPhoto(_this.group, _this.camera.PictureSourceType.CAMERA);
                    }
                }
            ]
        }).present();
    };
    // Search people to add as friend.
    NewGroupPage.prototype.searchPeople = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__search_people_search_people__["a" /* SearchPeoplePage */]);
    };
    NewGroupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-new-group',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/new-group/new-group.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <ion-buttons>\n      <button ion-button tappable (click)="back()">Back</button>\n    </ion-buttons>\n    <ion-title>New Group</ion-title>\n    <!-- New Group can only be added when a group form is filled up, image is uploaded, and there\'s more than one member. -->\n    <ion-buttons end>\n      <button ion-button tappable (click)="done()" [disabled]="!groupForm.valid || group.img == \'\' || groupMembers.length <= 1">Done</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <div *ngIf="group">\n    <!-- Set Group Image -->\n    <img src="{{group.img}}" *ngIf="group.img != \'\'" tappable (click)="setGroupPhoto()" />\n    <img src="assets/images/set.png" *ngIf="group.img == \'\'" tappable (click)="setGroupPhoto()" />\n    <!-- Group Form -->\n    <div class="form">\n      <form [formGroup]="groupForm">\n        <ion-list>\n          <ion-item no-lines>\n            <ion-label>Group *</ion-label>\n            <ion-input type="text" formControlName="name" placeholder="Name of Group"></ion-input>\n          </ion-item>\n          <ion-item no-lines>\n            <ion-label>Description *</ion-label>\n            <ion-textarea rows="4" formControlName="description" placeholder="Describe this Group"></ion-textarea>\n          </ion-item>\n          <!-- Members -->\n          <ion-item no-lines *ngIf="groupMembers">\n            <ion-label class="center">Group Members ({{groupMembers.length}})</ion-label>\n          </ion-item>\n          <div *ngIf="groupMembers" class="members">\n            <img *ngFor="let member of groupMembers" src="{{member.img}}" tappable (click)="removeFromGroup(member)"/>\n          </div>\n        </ion-list>\n      </form>\n      <!-- No friends to create a group. -->\n      <div class="empty" *ngIf="friends && friends.length == 0">\n        <p>You have no friends right now to start a group conversation.</p>\n        <button ion-button icon-left tappable (click)="searchPeople()"><ion-icon name="md-search"></ion-icon>Search People</button>\n      </div>\n      <!-- Show friends to add/remove to group. -->\n      <ion-list class="avatar-list" *ngIf="friends && friends.length > 0">\n        <ion-searchbar [(ngModel)]="searchFriend" placeholder="Search for friend or username" showCancelButton="true" cancelButtonText="Done"></ion-searchbar>\n        <ion-item *ngFor="let friend of friends | friendFilter:searchFriend" no-lines tappable (click)="addOrRemoveFromGroup(friend)">\n          <ion-fab middle right style="position: absolute; right: 0 ;">\n            <button ion-fab mini tappable (click)="addToGroup(friend); $event.stopPropagation();" *ngIf="!inGroup(friend)"><ion-icon name="md-add-circle" class="success"></ion-icon></button>\n            <button ion-fab mini tappable (click)="removeFromGroup(friend); $event.stopPropagation();" *ngIf="inGroup(friend)"><ion-icon name="md-close-circle" class="danger"></ion-icon></button>\n          </ion-fab>\n          <ion-avatar item-left>\n            <img src="{{friend.img}}">\n          </ion-avatar>\n          <h2>{{friend.name}}</h2>\n          <p>@{{friend.username}}</p>\n        </ion-item>\n      </ion-list>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/new-group/new-group.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_6__providers_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */]])
    ], NewGroupPage);
    return NewGroupPage;
}());

//# sourceMappingURL=new-group.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_image__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__image_modal_image_modal__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__add_members_add_members__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_info_user_info__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_lodash__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var GroupInfoPage = /** @class */ (function () {
    // GroupInfoPage
    // This is the page where the user can view group information, change group information, add members, and leave/delete group.
    function GroupInfoPage(navCtrl, navParams, dataProvider, loadingProvider, modalCtrl, alertCtrl, alertProvider, angularDb, imageProvider, camera, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.alertProvider = alertProvider;
        this.angularDb = angularDb;
        this.imageProvider = imageProvider;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
    }
    GroupInfoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Initialize
        this.groupId = this.navParams.get('groupId');
        // Get group details.
        this.subscription = this.dataProvider.getGroup(this.groupId).subscribe(function (group) {
            if (group.$exists()) {
                _this.loadingProvider.show();
                _this.group = group;
                if (group.admin) {
                    var index = __WEBPACK_IMPORTED_MODULE_12_lodash___default.a.indexOf(group.admin, __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid);
                    if (index > -1) {
                        _this.isAdmin = true;
                    }
                }
                if (group.members) {
                    group.members.forEach(function (memberId) {
                        _this.dataProvider.getUser(memberId).subscribe(function (member) {
                            _this.addUpdateOrRemoveMember(member);
                        });
                    });
                }
                _this.loadingProvider.hide();
            }
            else {
                // Group is deleted, go back.
                _this.navCtrl.popToRoot();
            }
        });
        // Get user details.
        this.dataProvider.getCurrentUser().subscribe(function (user) {
            _this.user = user;
        });
    };
    // Delete subscription.
    // ionViewDidLeave() {
    //   if(this.deleteSubscription)
    //
    // }
    // check user is admin or not 
    GroupInfoPage.prototype.isAdminOrNot = function (member) {
        var index = __WEBPACK_IMPORTED_MODULE_12_lodash___default.a.indexOf(this.group.admin, member.userId);
        if (index > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    // Assign new addmin 
    GroupInfoPage.prototype.assignNewAdmin = function (member) {
        var _this = this;
        if (this.isAdmin && this.user.userId !== member.userId) {
            if (this.isAdminOrNot(member)) {
                var actionSheet = this.actionSheetCtrl.create({
                    title: 'Remove Admin',
                    buttons: [
                        {
                            text: 'Remove Admin',
                            role: 'share',
                            handler: function () {
                                // share message 
                                // Check if sharing via email is supported
                                _this.loadingProvider.show();
                                var index = __WEBPACK_IMPORTED_MODULE_12_lodash___default.a.indexOf(_this.group.admin, member.userId);
                                if (index >= 0) {
                                    _this.group.messages.push({
                                        date: new Date().toString(),
                                        sender: _this.user.$key,
                                        type: 'system',
                                        message: _this.user.name + ' has removed ' + member.name + ' as admin.',
                                        icon: 'md-contacts'
                                    });
                                    _this.group.admin.splice(index, 1);
                                    _this.dataProvider.getGroup(_this.groupId).update({
                                        admin: _this.group.admin,
                                        messages: _this.group.messages
                                    }).then(function () {
                                        // Back.
                                        _this.loadingProvider.hide();
                                        _this.navCtrl.pop();
                                    });
                                }
                                else {
                                    _this.loadingProvider.hide();
                                    _this.alertProvider.showAlert('Failed', "Member not admin.");
                                }
                            }
                        },
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: function () {
                            }
                        }
                    ]
                });
                actionSheet.present();
            }
            else {
                var actionSheet = this.actionSheetCtrl.create({
                    title: 'Assign New Admin',
                    buttons: [
                        {
                            text: 'Make Admin',
                            role: 'share',
                            handler: function () {
                                // share message 
                                // Check if sharing via email is supported
                                _this.loadingProvider.show();
                                var index = __WEBPACK_IMPORTED_MODULE_12_lodash___default.a.indexOf(_this.group.admin, member.userId);
                                if (index < 0) {
                                    _this.group.messages.push({
                                        date: new Date().toString(),
                                        sender: _this.user.$key,
                                        type: 'system',
                                        message: _this.user.name + ' has make ' + member.name + ' as admin.',
                                        icon: 'md-contacts'
                                    });
                                    var _tempAdmin = _this.group.admin;
                                    _tempAdmin.push(member.userId);
                                    _this.dataProvider.getGroup(_this.groupId).update({
                                        admin: _tempAdmin,
                                        messages: _this.group.messages
                                    }).then(function () {
                                        // Back.
                                        _this.loadingProvider.hide();
                                        _this.navCtrl.pop();
                                    });
                                }
                                else {
                                    _this.loadingProvider.hide();
                                    _this.alertProvider.showAlert('Failed', "Member alerday admin.");
                                }
                            }
                        },
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: function () {
                            }
                        }
                    ]
                });
                actionSheet.present();
            }
        }
    };
    // Get names of the members to be added to the group.
    // Check if user exists in the group then add/update user.
    // If the user has already left the group, remove user from the list.
    GroupInfoPage.prototype.addUpdateOrRemoveMember = function (member) {
        if (this.group) {
            if (this.group.members.indexOf(member.$key) > -1) {
                // User exists in the group.
                if (!this.groupMembers) {
                    this.groupMembers = [member];
                }
                else {
                    var index = -1;
                    for (var i = 0; i < this.groupMembers.length; i++) {
                        if (this.groupMembers[i].$key == member.$key) {
                            index = i;
                        }
                    }
                    // Add/Update User.
                    if (index > -1) {
                        this.groupMembers[index] = member;
                    }
                    else {
                        this.groupMembers.push(member);
                    }
                }
            }
            else {
                // User already left the group, remove member from list.
                var index = -1;
                for (var i = 0; i < this.groupMembers.length; i++) {
                    if (this.groupMembers[i].$key == member.$key) {
                        index = i;
                    }
                }
                if (index > -1) {
                    this.groupMembers.splice(index, 1);
                }
            }
        }
    };
    // View user info.
    GroupInfoPage.prototype.viewUser = function (userId) {
        if (__WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid != userId)
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__user_info_user_info__["a" /* UserInfoPage */], { userId: userId });
    };
    // Back
    GroupInfoPage.prototype.back = function () {
        this.subscription.unsubscribe();
        this.navCtrl.pop();
    };
    // Enlarge group image.
    GroupInfoPage.prototype.enlargeImage = function (img) {
        var imageModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__image_modal_image_modal__["a" /* ImageModalPage */], { img: img });
        imageModal.present();
    };
    // Change group name.
    GroupInfoPage.prototype.setName = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Change Group Name',
            message: "Please enter a new group name.",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Group Name',
                    value: this.group.name
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var name = data["name"];
                        if (_this.group.name != name) {
                            _this.loadingProvider.show();
                            // Add system message.
                            _this.group.messages.push({
                                date: new Date().toString(),
                                sender: _this.user.$key,
                                type: 'system',
                                message: _this.user.name + ' has changed the group name to: ' + name + '.',
                                icon: 'md-create'
                            });
                            // Update group on database.
                            _this.dataProvider.getGroup(_this.groupId).update({
                                name: name,
                                messages: _this.group.messages
                            }).then(function (success) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showGroupUpdatedMessage();
                            }).catch(function (error) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showErrorMessage('group/error-update-group');
                            });
                        }
                    }
                }
            ]
        }).present();
    };
    // Change group image, the user is asked if they want to take a photo or choose from gallery.
    GroupInfoPage.prototype.setPhoto = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Set Group Photo',
            message: 'Do you want to take a photo or choose from your photo gallery?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Choose from Gallery',
                    handler: function () {
                        _this.loadingProvider.show();
                        // Upload photo and set to group photo, afterwards, return the group object as promise.
                        _this.imageProvider.setGroupPhotoPromise(_this.group, _this.camera.PictureSourceType.PHOTOLIBRARY).then(function (group) {
                            // Add system message.
                            _this.group.messages.push({
                                date: new Date().toString(),
                                sender: _this.user.$key,
                                type: 'system',
                                message: _this.user.name + ' has changed the group photo.',
                                icon: 'ios-camera'
                            });
                            // Update group image on database.
                            _this.dataProvider.getGroup(_this.groupId).update({
                                img: group.img,
                                messages: _this.group.messages
                            }).then(function (success) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showGroupUpdatedMessage();
                            }).catch(function (error) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showErrorMessage('group/error-update-group');
                            });
                        });
                    }
                },
                {
                    text: 'Take Photo',
                    handler: function () {
                        _this.loadingProvider.show();
                        // Upload photo and set to group photo, afterwwards, return the group object as promise.
                        _this.imageProvider.setGroupPhotoPromise(_this.group, _this.camera.PictureSourceType.CAMERA).then(function (group) {
                            // Add system message.
                            _this.group.messages.push({
                                date: new Date().toString(),
                                sender: _this.user.$key,
                                type: 'system',
                                message: _this.user.name + ' has changed the group photo.',
                                icon: 'ios-camera'
                            });
                            // Update group image on database.
                            _this.dataProvider.getGroup(_this.groupId).update({
                                img: group.img,
                                messages: _this.group.messages
                            }).then(function (success) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showGroupUpdatedMessage();
                            }).catch(function (error) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showErrorMessage('group/error-update-group');
                            });
                        });
                    }
                }
            ]
        }).present();
    };
    // Change group description.
    GroupInfoPage.prototype.setDescription = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Change Group Description',
            message: "Please enter a new group description.",
            inputs: [
                {
                    name: 'description',
                    placeholder: 'Group Description',
                    value: this.group.description
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var description = data["description"];
                        if (_this.group.description != description) {
                            _this.loadingProvider.show();
                            // Add system message.
                            _this.group.messages.push({
                                date: new Date().toString(),
                                sender: _this.user.$key,
                                type: 'system',
                                message: _this.user.name + ' has changed the group description.',
                                icon: 'md-clipboard'
                            });
                            // Update group on database.
                            _this.dataProvider.getGroup(_this.groupId).update({
                                description: description,
                                messages: _this.group.messages
                            }).then(function (success) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showGroupUpdatedMessage();
                            }).catch(function (error) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showErrorMessage('group/error-update-group');
                            });
                        }
                    }
                }
            ]
        }).present();
    };
    // Leave group.
    GroupInfoPage.prototype.leaveGroup = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm Leave',
            message: 'Are you sure you want to leave this group?',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Leave',
                    handler: function (data) {
                        _this.loadingProvider.show();
                        // Remove member from group.
                        _this.group.members.splice(_this.group.members.indexOf(_this.user.$key), 1);
                        // Add system message.
                        _this.group.messages.push({
                            date: new Date().toString(),
                            sender: _this.user.$key,
                            type: 'system',
                            message: _this.user.name + ' has left this group.',
                            icon: 'md-log-out'
                        });
                        // Update group on database.
                        _this.dataProvider.getGroup(_this.groupId).update({
                            members: _this.group.members,
                            messages: _this.group.messages
                        }).then(function (success) {
                            // Remove group from user's group list.
                            _this.angularDb.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid + '/groups/' + _this.groupId).remove().then(function () {
                                // Pop this view because user already has left this group.
                                _this.group = null;
                                setTimeout(function () {
                                    _this.loadingProvider.hide();
                                    _this.navCtrl.popToRoot();
                                }, 300);
                            });
                        }).catch(function (error) {
                            _this.alertProvider.showErrorMessage('group/error-leave-group');
                        });
                    }
                }
            ]
        }).present();
    };
    // Delete group.
    GroupInfoPage.prototype.deleteGroup = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this group?',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Delete',
                    handler: function (data) {
                        var group = JSON.parse(JSON.stringify(_this.group));
                        // Delete all images of image messages.
                        group.messages.forEach(function (message) {
                            if (message.type == 'image') {
                                _this.imageProvider.deleteGroupImageFile(group.$key, message.url);
                            }
                        });
                        // Delete group image.
                        _this.imageProvider.deleteImageFile(group.img);
                        _this.angularDb.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid + '/groups/' + group.$key).remove().then(function () {
                            _this.dataProvider.getGroup(group.$key).remove();
                        });
                    }
                }
            ]
        }).present();
    };
    // Add members.
    GroupInfoPage.prototype.addMembers = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__add_members_add_members__["a" /* AddMembersPage */], { groupId: this.groupId });
    };
    GroupInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-group-info',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/group-info/group-info.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <ion-buttons>\n      <button ion-button tappable (click)="back()">Back</button>\n    </ion-buttons>\n    <ion-title>Group Info</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!-- Group Info -->\n  <div *ngIf="group">\n    <div class="profile">\n      <img src="{{group.img}}" tappable (click)="setPhoto()" />\n    </div>\n    <h4>\n      <span tappable (click)="setName()">{{group.name}}</span>\n    </h4>\n    <p class="username">Started {{group.dateCreated | DateFormat}}</p>\n    <p class="description" tappable (click)="setDescription()">{{group.description}}</p>\n    <div class="divider"></div>\n    <!-- Members -->\n    <div *ngIf="groupMembers" class="members">\n      <!-- <img *ngFor="let member of groupMembers" src="{{member.img}}"  tappable (click)="viewUser(member.$key)" [ngStyle]="{\'border\': isAdminOrNot(member) ? \'1px solid red\' : \'1px solid #cccccc\'}"/> -->\n      <span *ngFor="let member of groupMembers" (press)="assignNewAdmin(member)">\n        <img  src="{{member.img}}"  tappable (click)="viewUser(member.$key)" *ngIf="isAdminOrNot(member)" style="border:2px solid green"/>\n        <img  src="{{member.img}}"  tappable (click)="viewUser(member.$key)" *ngIf="!isAdminOrNot(member)" style="border:2px solid #cccccc"/>\n      </span>\n    </div>\n    <!-- Group Menu -->\n    <ion-list>\n      <ion-item no-lines tappable (click)="setName()">\n        Set Group Name\n        <ion-icon name="md-chatbubbles" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="setPhoto()">\n        Set Group Photo\n        <ion-icon name="ios-camera" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="setDescription()">\n        Set Group Description\n        <ion-icon name="md-clipboard" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="addMembers()" *ngIf="isAdmin">\n        Add More Members\n        <ion-icon name="md-contacts" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="leaveGroup()" *ngIf="groupMembers && groupMembers.length > 1">\n        Leave Group\n        <ion-icon name="md-log-out" item-right></ion-icon>\n      </ion-item>\n      <!-- When there\'s only one member left, allow deleting of group. -->\n      <ion-item no-lines tappable (click)="deleteGroup()" *ngIf="groupMembers && groupMembers.length <= 1">\n        Delete Group\n        <ion-icon name="md-trash" item-right></ion-icon>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/group-info/group-info.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__providers_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], GroupInfoPage);
    return GroupInfoPage;
}());

//# sourceMappingURL=group-info.js.map

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddMembersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AddMembersPage = /** @class */ (function () {
    // AddMemberPage
    // This is the page where the user can add their friends to an existing group.
    // The user can only add their friends to the group.
    function AddMembersPage(navCtrl, navParams, dataProvider, loadingProvider, angularfire, angularDb, alertCtrl, alertProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
        this.angularfire = angularfire;
        this.angularDb = angularDb;
        this.alertCtrl = alertCtrl;
        this.alertProvider = alertProvider;
    }
    AddMembersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Initialize
        this.groupId = this.navParams.get('groupId');
        this.searchFriend = '';
        this.toAdd = [];
        this.loadingProvider.show();
        // Get user information for system message sent to the group when a member was added.
        this.dataProvider.getCurrentUser().subscribe(function (user) {
            _this.user = user;
        });
        // Get group information
        this.dataProvider.getGroup(this.groupId).subscribe(function (group) {
            _this.group = group;
            _this.groupMembers = null;
            // Get group members
            if (group.members) {
                group.members.forEach(function (memberId) {
                    _this.dataProvider.getUser(memberId).subscribe(function (member) {
                        _this.addOrUpdateMember(member);
                    });
                });
                // Get user's friends to add
                _this.dataProvider.getCurrentUser().subscribe(function (account) {
                    if (account.friends) {
                        for (var i = 0; i < account.friends.length; i++) {
                            _this.dataProvider.getUser(account.friends[i]).subscribe(function (friend) {
                                // Only friends that are not yet a member of this group can be added.
                                if (!_this.isMember(friend))
                                    _this.addOrUpdateFriend(friend);
                            });
                        }
                        if (!_this.friends) {
                            _this.friends = [];
                        }
                    }
                    else {
                        _this.friends = [];
                    }
                });
            }
            _this.loadingProvider.hide();
        });
    };
    // Check if friend is a member of the group or not.
    AddMembersPage.prototype.isMember = function (friend) {
        if (this.groupMembers) {
            for (var i = 0; i < this.groupMembers.length; i++) {
                if (this.groupMembers[i].$key == friend.$key) {
                    return true;
                }
            }
        }
        return false;
    };
    // Check if friend is already on the list of members to be added.
    AddMembersPage.prototype.isAdded = function (friend) {
        if (this.toAdd) {
            for (var i = 0; i < this.toAdd.length; i++) {
                if (this.toAdd[i].$key == friend.$key) {
                    return true;
                }
            }
        }
        return false;
    };
    // Toggle for adding/removing friend on the list of members to be added.
    AddMembersPage.prototype.addOrRemove = function (friend) {
        if (this.isAdded(friend)) {
            this.remove(friend);
        }
        else {
            this.add(friend);
        }
    };
    // Add or update friend information for real-time sync.
    AddMembersPage.prototype.addOrUpdateFriend = function (friend) {
        if (!this.friends) {
            this.friends = [friend];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friends.length; i++) {
                if (this.friends[i].$key == friend.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.friends[index] = friend;
            }
            else {
                this.friends.push(friend);
            }
        }
    };
    // Add or update member information for real-time sync.
    AddMembersPage.prototype.addOrUpdateMember = function (member) {
        if (!this.groupMembers) {
            this.groupMembers = [member];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.groupMembers.length; i++) {
                if (this.groupMembers[i].$key == member.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.groupMembers[index] = member;
            }
            else {
                this.groupMembers.push(member);
            }
        }
    };
    // Add friend to the list of to be added.
    AddMembersPage.prototype.add = function (friend) {
        this.toAdd.push(friend);
    };
    // Remove friend from the list of to be added.
    AddMembersPage.prototype.remove = function (friend) {
        this.toAdd.splice(this.toAdd.indexOf(friend), 1);
    };
    // Back
    AddMembersPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    // Get names of the members to be added to the group.
    AddMembersPage.prototype.getNames = function () {
        var names = '';
        this.toAdd.forEach(function (friend) {
            names += friend.name + ', ';
        });
        return names.substring(0, names.length - 2);
    };
    // Confirm adding of new members, afterwards add the members.
    AddMembersPage.prototype.done = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Add Members',
            message: 'Are you sure you want to add <b>' + this.getNames() + '</b> to the group?',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Add',
                    handler: function (data) {
                        // Proceed
                        _this.loadingProvider.show();
                        _this.toAdd.forEach(function (friend) {
                            // Add groupInfo to each friend added to the group.
                            _this.angularDb.object('/accounts/' + friend.$key + '/groups/' + _this.groupId).update({
                                messagesRead: 0
                            });
                            // Add friend as members of the group.
                            _this.group.members.push(friend.$key);
                            // Add system message that the members are added to the group.
                            _this.group.messages.push({
                                date: new Date().toString(),
                                sender: _this.user.$key,
                                type: 'system',
                                message: _this.user.name + ' has added ' + _this.getNames() + ' to the group.',
                                icon: 'md-contacts'
                            });
                        });
                        // Update group data on the database.
                        _this.dataProvider.getGroup(_this.groupId).update({
                            members: _this.group.members,
                            messages: _this.group.messages
                        }).then(function () {
                            // Back.
                            _this.loadingProvider.hide();
                            _this.navCtrl.pop();
                        });
                    }
                }
            ]
        }).present();
    };
    AddMembersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-add-members',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/add-members/add-members.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <ion-buttons>\n      <button ion-button tappable (click)="back()">Back</button>\n    </ion-buttons>\n    <ion-title>Add Members</ion-title>\n    <!-- Only enable button when user is adding atleast one member to the group -->\n    <ion-buttons end>\n      <button ion-button tappable (click)="done()" [disabled]="toAdd && toAdd.length < 1">Done</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!-- All friends already in the group. -->\n  <div class="empty-list" *ngIf="friends && friends.length == 0">\n    <h1><ion-icon name="md-contacts"></ion-icon></h1>\n    <p>Uh-oh! Sorry but your friends are already a member of this group.</p>\n    <button ion-button icon-left tappable (click)="back()"><ion-icon name="md-arrow-round-back"></ion-icon>Go Back</button>\n  </div>\n  <!-- Add/Cancel Add friends to the group. -->\n  <ion-list class="avatar-list" *ngIf="friends && friends.length > 0">\n    <ion-searchbar [(ngModel)]="searchFriend" placeholder="Search for friend or username" showCancelButton="true" cancelButtonText="Done"></ion-searchbar>\n    <ion-item *ngFor="let friend of friends | friendFilter:searchFriend" no-lines tappable (click)="addOrRemove(friend)">\n      <ion-fab middle right>\n        <button ion-fab mini tappable (click)="add(friend); $event.stopPropagation();" *ngIf="!isAdded(friend)"><ion-icon name="md-add-circle" class="success"></ion-icon></button>\n        <button ion-fab mini tappable (click)="remove(friend); $event.stopPropagation();" *ngIf="isAdded(friend)"><ion-icon name="md-close-circle" class="danger"></ion-icon></button>\n      </ion-fab>\n      <ion-avatar item-left>\n        <img src="{{friend.img}}">\n      </ion-avatar>\n      <h2>{{friend.name}}</h2>\n      <p>@{{friend.username}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/add-members/add-members.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFireModule */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_alert__["a" /* AlertProvider */]])
    ], AddMembersPage);
    return AddMembersPage;
}());

//# sourceMappingURL=add-members.js.map

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_people_search_people__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_info_user_info__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_message__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__requests_requests__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__update_contact_update_contact__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_contacts__ = __webpack_require__(131);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var FriendsPage = /** @class */ (function () {
    // FriendsPage
    // This is the page where the user can search, view, and initiate a chat with their friends.
    function FriendsPage(navCtrl, navParams, app, dataProvider, loadingProvider, contacts, modalCtrl, socialsharing) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
        this.contacts = contacts;
        this.modalCtrl = modalCtrl;
        this.socialsharing = socialsharing;
        this.mode = "Friends";
        this.isLoadding = true;
        this.isContentNumber = false;
    }
    FriendsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Initialize
        this.searchFriend = "";
        this.loadingProvider.show();
        // Get friendRequests to show friendRequests count.
        this.dataProvider
            .getRequests(__WEBPACK_IMPORTED_MODULE_8_firebase__["auth"]().currentUser.uid)
            .subscribe(function (requests) {
            _this.friendRequests = requests.friendRequests;
        });
        // Get user data on database and get list of friends.
        var userData = this.dataProvider.getCurrentUser().subscribe(function (account) {
            _this.account = account;
            if (_this.account.phoneNumber != "") {
                _this.isContentNumber = true;
            }
            if (account.friends) {
                for (var i = 0; i < account.friends.length; i++) {
                    _this.dataProvider.getUser(account.friends[i]).subscribe(function (friend) {
                        _this.addOrUpdateFriend(friend);
                    });
                }
            }
            else {
                _this.friends = [];
            }
            // this.getContact()
            // ==== GET CONTACT ===
            _this.dataProvider.getContact().then(function (data) {
                if (data && _this.account != "") {
                    _this.dataProvider
                        .setContactWithCountryCode(_this.account.countryCode)
                        .then(function (friend) {
                        _this.contactFriends = friend;
                        _this.contactFriends = __WEBPACK_IMPORTED_MODULE_9_lodash___default.a.sortBy(_this.contactFriends, ["name"]);
                        _this.isLoadding = false;
                    });
                }
            });
            _this.loadingProvider.hide();
            userData.unsubscribe();
        });
    };
    // Add or update friend data for real-time sync.
    FriendsPage.prototype.addOrUpdateFriend = function (friend) {
        if (!this.friends) {
            this.friends = [friend];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friends.length; i++) {
                if (this.friends[i].$key == friend.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.friends[index] = friend;
            }
            else {
                this.friends.push(friend);
            }
        }
    };
    // update contact number
    FriendsPage.prototype.updateContact = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_11__update_contact_update_contact__["a" /* UpdateContactPage */], {
            userData: this.account
        });
        modal.present();
    };
    // Proceed to searchPeople page.
    FriendsPage.prototype.searchPeople = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__search_people_search_people__["a" /* SearchPeoplePage */]);
    };
    // Proceed to requests page.
    FriendsPage.prototype.manageRequests = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__requests_requests__["a" /* RequestsPage */]);
    };
    // Proceed to userInfo page.
    FriendsPage.prototype.viewUser = function (userId) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__user_info_user_info__["a" /* UserInfoPage */], { userId: userId });
    };
    // Proceed to chat page.
    FriendsPage.prototype.message = function (userId) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__message_message__["a" /* MessagePage */], { userId: userId });
    };
    // get Contact number
    // getContact(){
    //   this.contacts.find(["*"],{}).then((data)=>{
    //     // this.contactlist = data
    //     for (let i=0; i<data.length; i++) {
    //         setTimeout( ()=>{
    //               let _phoneNumber ;
    //               if(data[i].phoneNumbers[0].value.toString().charAt(0) == '*' ||
    //                    data[i].phoneNumbers[0].value.toString().charAt(0) == '#') {
    //               }else{
    //                 let temp = data[i].phoneNumbers[0].value.toString().split('(').join('');
    //                 temp = temp.split(')').join("");
    //                 temp = temp.split('(').join("");
    //                 temp = temp.split(' ').join("");
    //                 temp = temp.replace(/\s/g,"");
    //                 temp = temp.split('-').join("");
    //                 if(temp.charAt(0) == '+') {
    //                     let _phoneNumber = temp.toString();
    //                     this.contactNumber(_phoneNumber,data[i])
    //                 }else if (temp.charAt(0) == '0' && temp.charAt(1) == '0'){
    //                   let _phoneNumber = '+1' + temp.substr(2).toString();
    //                   this.contactNumber(_phoneNumber,data[i])
    //                 }else if(temp.charAt(0) == '0') {
    //                   let _phoneNumber = '+1' + temp.substr(1).toString();
    //                   this.contactNumber(_phoneNumber,data[i])
    //                 }else {
    //                   let _phoneNumber = '+1' + temp.toString();
    //                   this.contactNumber(_phoneNumber,data[i])
    //                 }
    //               }
    //         }, i*1000 );
    //     }
    //     setTimeout(()=>{
    //        this.contactFriends = _.sortBy(this.contactFriends, ['isUser', 'name']);
    //        this.isLoadding = false;
    //     },1000*data.length)
    //   })
    // }
    // contactNumber(_phoneNumber,data){
    //   this.dataProvider.getUserWithPhonenumber(_phoneNumber).take(1).subscribe((userList) => {
    //       if(userList.length>0){
    //         let _tempData = userList[0]
    //         _tempData.isUser ='0'; // is user
    //         if (this.account.friends) {
    //            let index =  this.account.friends.indexOf(_tempData.userId)
    //            if(index>=0){
    //                _tempData.isFriend = '0' // is alerday friend
    //                this.contactFriends.push(_tempData)
    //            }else{
    //              this.contactFriends.push(_tempData)
    //            }
    //         }
    //       }else{
    //         let _tempData = {
    //           phoneNumber:_phoneNumber,
    //           isUser:'1', // is not user
    //           img:"assets/images/profile.png",
    //           name: this.getNameFromContact(data,_phoneNumber),
    //         }
    //        this.contactFriends.push(_tempData)
    //       }
    //   })
    // }
    // getNameFromContact(contact,number) {
    //   // if(JSON.stringify(contact.name) == '{}') {
    //   //   return 'Unknown';
    //   // } else {
    //   //   return contact.name.formatted;
    //   // }
    //   if(contact.name){
    //     if(contact.name.formatted){
    //       return contact.name.formatted;
    //     }else{
    //     return number
    //     }
    //   }else{
    //     return number
    //   }
    // }
    FriendsPage.prototype.inivite = function (data) {
        var msg = "Hey, I am using ionSocial. It's Awsome app please download it. http://mayoraservices.com";
        this.socialsharing.shareViaSMS(msg, data.phoneNumber);
    };
    FriendsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "page-friends",template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/friends/friends.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons>\n      <button ion-button icon-only tappable (click)="manageRequests()"><ion-icon name="md-filing"></ion-icon><ion-badge color="danger" *ngIf="friendRequests">{{friendRequests.length}}</ion-badge></button>\n    </ion-buttons>\n    <ion-title>Friends</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only tappable (click)="searchPeople()"><ion-icon name="md-search"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-segment color="dark"  [(ngModel)]="mode">\n    <ion-segment-button value="Friends" color>\n        Friends\n    </ion-segment-button>\n    <ion-segment-button value="MyContacts">\n      My Contacts\n    </ion-segment-button>\n  </ion-segment>\n</ion-header>\n\n<ion-content>   \n  <div [ngSwitch]="mode">\n    <div *ngSwitchCase="\'Friends\'">\n      <!-- No friends to show -->\n      <div class="empty-list" *ngIf="friends && friends.length == 0">\n        <h1><ion-icon name="md-contacts"></ion-icon></h1>\n        <p>Uh-oh! You have not added any friends right now.</p>\n        <button ion-button icon-left tappable (click)="searchPeople()"><ion-icon name="md-search"></ion-icon>Search People</button>\n      </div>\n      <!-- Show list of friends -->\n      <ion-list class="avatar-list" *ngIf="friends && friends.length > 0">\n        <ion-searchbar [(ngModel)]="searchFriend" placeholder="Search for friend or username" showCancelButton="true" cancelButtonText="Done"></ion-searchbar>\n        <ion-item *ngFor="let friend of friends | friendFilter:searchFriend" no-lines tappable (click)="viewUser(friend.$key)">\n          <ion-fab middle right style="position: absolute; right: 0 ;">\n            <button ion-fab mini tappable (click)="message(friend.$key); $event.stopPropagation();"><ion-icon name="md-text" class="success"></ion-icon></button>\n          </ion-fab>\n          <ion-avatar item-left>\n            <ion-icon name="radio-button-on" class="online" [ngClass]="friend.isOnline?\'isOnline\' : \'isOffline\'"></ion-icon>\n            <img src="{{friend.img}}">\n          </ion-avatar>\n          <h2>{{friend.name}}</h2>\n          <p>@{{friend.username}}</p>\n        </ion-item>\n      </ion-list>\n    </div>\n    <div *ngSwitchCase="\'MyContacts\'">\n      <div style="text-align:center\';margin:0px auto" *ngIf="isLoadding"> <!--*ngIf="isLoadding"-->\n        <ion-spinner style="text-align:center"></ion-spinner>\n      </div>\n     <!-- No friends to show -->\n      <div class="empty-list" *ngIf="contactFriends && contactFriends.length == 0 && !isLoadding">\n        <h1><ion-icon name="md-contacts"></ion-icon></h1>\n        <p>Uh-oh! You have not added any contacts friends right now.</p>\n        <button *ngIf="!isContentNumber" ion-button icon-left tappable (click)="updateContact()"><ion-icon name="md-add"></ion-icon>Update Your Contact Number</button>\n      </div>\n     <ion-list>\n        <span *ngIf="!isLoadding">\n          <ion-item *ngFor="let friend of contactFriends" no-lines tappable>\n            <button ion-button item-end  color="primary"  (click)="inivite(friend)" *ngIf="friend.isUser == \'0\'"> INVITE</button>\n            <!-- <button ion-button item-end  color="primary"> INVITE</button> -->\n          <!--   <button ion-fab mini tappable (click)="message(friend.$key); $event.stopPropagation();" *ngIf="friend.isFriend == 0"><ion-icon name="md-text" class="success"></ion-icon></button> -->\n          <ion-avatar item-left>\n            <img src="assets/images/profile.png">\n          </ion-avatar>\n          <h2>{{friend.name}}</h2>\n          <p>@{{friend.phoneNumber}}</p>\n        </ion-item>\n        </span>\n        \n    </ion-list>\n    </div>\n  </div>\n  \n \n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/friends/friends.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_6__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_contacts__["a" /* Contacts */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], FriendsPage);
    return FriendsPage;
}());

//# sourceMappingURL=friends.js.map

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__user_info_user_info__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RequestsPage = /** @class */ (function () {
    // RequestsPage
    // This is the page where the user can see their friend requests sent and received.
    function RequestsPage(navCtrl, navParams, dataProvider, alertCtrl, angularDb, loadingProvider, alertProvider, firebaseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.alertCtrl = alertCtrl;
        this.angularDb = angularDb;
        this.loadingProvider = loadingProvider;
        this.alertProvider = alertProvider;
        this.firebaseProvider = firebaseProvider;
    }
    RequestsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loadingProvider.show();
        // Get user info
        this.dataProvider.getCurrentUser().subscribe(function (account) {
            _this.account = account;
            // Get friendRequests and requestsSent of the user.
            _this.dataProvider.getRequests(_this.account.userId).subscribe(function (requests) {
                // friendRequests.
                if (requests.friendRequests) {
                    _this.friendRequests = [];
                    requests.friendRequests.forEach(function (userId) {
                        _this.dataProvider.getUser(userId).subscribe(function (sender) {
                            _this.addOrUpdateFriendRequest(sender);
                        });
                    });
                }
                else {
                    _this.friendRequests = [];
                }
                // requestsSent.
                if (requests.requestsSent) {
                    _this.requestsSent = [];
                    requests.requestsSent.forEach(function (userId) {
                        _this.dataProvider.getUser(userId).subscribe(function (receiver) {
                            _this.addOrUpdateRequestSent(receiver);
                        });
                    });
                }
                else {
                    _this.requestsSent = [];
                }
                _this.loadingProvider.hide();
            });
        });
    };
    // Add or update friend request only if not yet friends.
    RequestsPage.prototype.addOrUpdateFriendRequest = function (sender) {
        if (!this.friendRequests) {
            this.friendRequests = [sender];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friendRequests.length; i++) {
                if (this.friendRequests[i].$key == sender.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                if (!this.isFriends(sender.$key))
                    this.friendRequests[index] = sender;
            }
            else {
                if (!this.isFriends(sender.$key))
                    this.friendRequests.push(sender);
            }
        }
    };
    // Add or update requests sent only if the user is not yet a friend.
    RequestsPage.prototype.addOrUpdateRequestSent = function (receiver) {
        if (!this.requestsSent) {
            this.requestsSent = [receiver];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.requestsSent.length; i++) {
                if (this.requestsSent[i].$key == receiver.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                if (!this.isFriends(receiver.$key))
                    this.requestsSent[index] = receiver;
            }
            else {
                if (!this.isFriends(receiver.$key))
                    this.requestsSent.push(receiver);
            }
        }
    };
    // Back
    RequestsPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    // Accept Friend Request.
    RequestsPage.prototype.acceptFriendRequest = function (user) {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm Friend Request',
            message: 'Do you want to accept <b>' + user.name + '</b> as your friend?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Reject Request',
                    handler: function () {
                        _this.firebaseProvider.deleteFriendRequest(user.$key);
                    }
                },
                {
                    text: 'Accept Request',
                    handler: function () {
                        _this.firebaseProvider.acceptFriendRequest(user.$key);
                    }
                }
            ]
        }).present();
    };
    // Cancel Friend Request sent.
    RequestsPage.prototype.cancelFriendRequest = function (user) {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Friend Request Pending',
            message: 'Do you want to delete your friend request to <b>' + user.name + '</b>?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.firebaseProvider.cancelFriendRequest(user.$key);
                    }
                }
            ]
        }).present();
    };
    // Checks if user is already friends with this user.
    RequestsPage.prototype.isFriends = function (userId) {
        if (this.account.friends) {
            if (this.account.friends.indexOf(userId) == -1) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    // View user.
    RequestsPage.prototype.viewUser = function (userId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__user_info_user_info__["a" /* UserInfoPage */], { userId: userId });
    };
    RequestsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-requests',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/requests/requests.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <ion-buttons>\n      <button ion-button tappable (click)="back()">Back</button>\n    </ion-buttons>\n    <ion-title>Friend Requests</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!-- No friend requests sent or received. -->\n  <div class="empty-list" *ngIf="(friendRequests && friendRequests.length == 0) && (requestsSent && requestsSent.length == 0)">\n    <h1><ion-icon name="md-filing"></ion-icon></h1>\n    <p>Uh-oh! There are no pending friend requests right now.</p>\n    <button ion-button icon-left tappable (click)="back()"><ion-icon name="md-arrow-round-back"></ion-icon>Go Back</button>\n  </div>\n  <!-- Show friend requests received. -->\n  <ion-list class="avatar-list" *ngIf="friendRequests && friendRequests.length > 0">\n    <ion-item *ngFor="let friendRequest of friendRequests" no-lines tappable (click)="viewUser(friendRequest.$key)">\n      <ion-fab middle right style="position: absolute; right: 0 ;">\n        <button ion-fab mini tappable (click)="acceptFriendRequest(friendRequest); $event.stopPropagation();">\n          <ion-icon name="md-checkmark-circle" class="success"></ion-icon>\n        </button>\n      </ion-fab>\n      <ion-avatar item-left>\n        <ion-icon name="radio-button-on" class="online" [ngClass]="friendRequest.isOnline?\'isOnline\' : \'isOffline\'"></ion-icon>\n        <img src="{{friendRequest.img}}">\n      </ion-avatar>\n      <h2>{{friendRequest.name}}</h2>\n      <p>has sent you a friend request.</p>\n    </ion-item>\n  </ion-list>\n  <!-- Show friend requests sent. -->\n  <ion-list class="avatar-list" *ngIf="requestsSent && requestsSent.length > 0">\n    <ion-item *ngFor="let requestSent of requestsSent" no-lines tappable (click)="viewUser(requestSent.$key)">\n      <ion-fab middle right style="position: absolute; right: 0 ;">\n        <button ion-fab mini tappable (click)="cancelFriendRequest(requestSent); $event.stopPropagation();">\n          <ion-icon name="md-close-circle" class="danger"></ion-icon>\n        </button>\n      </ion-fab>\n      <ion-avatar item-left>\n        <img src="{{requestSent.img}}">\n      </ion-avatar>\n      <h2>{{requestSent.name}}</h2>\n      <p>friend request sent.</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/requests/requests.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_6__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_firebase__["a" /* FirebaseProvider */]])
    ], RequestsPage);
    return RequestsPage;
}());

//# sourceMappingURL=requests.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_logout__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__validator__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var VerificationPage = /** @class */ (function () {
    function VerificationPage(navCtrl, alertCtrl, navParams, app, logoutProvider, loadingProvider, angularDb, alertProvider) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.app = app;
        this.logoutProvider = logoutProvider;
        this.loadingProvider = loadingProvider;
        this.angularDb = angularDb;
        this.alertProvider = alertProvider;
        // Hook our logout provider with the app.
        this.logoutProvider.setApp(this.app);
    }
    VerificationPage.prototype.ionViewDidLoad = function () {
        // Set our routeGuard variables to false, to not allow rereouting.
        this.emailVerified = false;
        this.isLoggingOut = false;
        // Get user data and send an email verification automatically.
        this.getUserData();
        this.sendEmailVerification();
        // Create the emailVerification checker.
        var that = this;
        that.checkVerified = setInterval(function () {
            __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.reload();
            if (__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.emailVerified) {
                clearInterval(that.checkVerified);
                that.emailVerified = true;
                that.alertProvider.showEmailVerifiedMessageAndRedirect(that.navCtrl);
            }
        }, 1000);
    };
    VerificationPage.prototype.ionViewCanLeave = function () {
        // routeGuard to prevent from leaving this view unless email is verified, or user is logging out.
        if (this.emailVerified || this.isLoggingOut) {
            return true;
        }
        else {
            return false;
        }
    };
    // Get user data from the logged in Firebase user to show on html markup.
    VerificationPage.prototype.getUserData = function () {
        var user = __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser;
        var userId, name, provider, img, email;
        var providerData = user.providerData[0];
        userId = user.uid;
        // Retrieve name from Firebase user
        if (user.displayName || providerData.displayName) {
            name = user.displayName;
            name = providerData.displayName;
        }
        else {
            name = "ionSocial User";
        }
        // Retrieve provider from Firebase user
        if (providerData.providerId == "password") {
            provider = "Firebase";
        }
        else if (providerData.providerId == "facebook.com") {
            provider = "Facebook";
        }
        else if (providerData.providerId == "google.com") {
            provider = "Google";
        }
        // Retrieve photoURL from Firebase user
        if (user.photoURL || providerData.photoURL) {
            img = user.photoURL;
            img = providerData.photoURL;
        }
        else {
            img = "assets/images/profile.png";
        }
        // Retrieve email from Firebase user
        email = user.email;
        // Set to user variable for our markup html
        this.user = {
            userId: userId,
            name: name,
            provider: provider,
            img: img,
            email: email
        };
    };
    // Send an email verification to the user's email.
    VerificationPage.prototype.sendEmailVerification = function () {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]()
            .currentUser.sendEmailVerification()
            .then(function (success) {
            _this.alertProvider.showEmailVerificationSentMessage(__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.email);
            _this.loadingProvider.hide();
        });
    };
    // Set the user email
    VerificationPage.prototype.setEmail = function () {
        var _this = this;
        this.alert = this.alertCtrl
            .create({
            title: "Change Email Address",
            message: "Please enter a new email address.",
            inputs: [
                {
                    name: "email",
                    placeholder: "Your Email Address",
                    value: __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.email
                }
            ],
            buttons: [
                {
                    text: "Cancel",
                    handler: function (data) { }
                },
                {
                    text: "Save",
                    handler: function (data) {
                        var email = data["email"];
                        // Check if entered email is different from the current email
                        if (__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.email != email) {
                            // Check if email is valid.
                            if (__WEBPACK_IMPORTED_MODULE_6__validator__["a" /* Validator */].profileEmailValidator.pattern.test(email)) {
                                _this.loadingProvider.show();
                                // Update email on Firebase
                                __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]()
                                    .currentUser.updateEmail(email)
                                    .then(function (success) {
                                    __WEBPACK_IMPORTED_MODULE_6__validator__["a" /* Validator */].profileEmailValidator.pattern.test(email);
                                    _this.loadingProvider.hide();
                                    // Clear the existing interval because when we call ionViewDidLoad, another interval will be created.
                                    clearInterval(_this.checkVerified);
                                    // Call ionViewDidLoad again to update user on the markup and automatically send verification mail.
                                    _this.ionViewDidLoad();
                                    // Update the user data on the database if it exists.
                                    __WEBPACK_IMPORTED_MODULE_7_firebase__["database"]()
                                        .ref("accounts/" + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid)
                                        .once("value")
                                        .then(function (account) {
                                        if (account.val()) {
                                            _this.angularDb
                                                .object("/accounts/" + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid)
                                                .update({
                                                email: email
                                            });
                                        }
                                    });
                                })
                                    .catch(function (error) {
                                    //Show error
                                    _this.loadingProvider.hide();
                                    var code = error["code"];
                                    _this.alertProvider.showErrorMessage(code);
                                    if (code == "auth/requires-recent-login") {
                                        _this.logoutProvider.logout();
                                    }
                                });
                            }
                            else {
                                _this.alertProvider.showErrorMessage("profile/invalid-email");
                            }
                        }
                    }
                }
            ]
        })
            .present();
    };
    // Clear the interval, and log the user out.
    VerificationPage.prototype.logout = function () {
        var _this = this;
        this.alert = this.alertCtrl
            .create({
            title: "Confirm Logout",
            message: "Are you sure you want to logout?",
            buttons: [
                {
                    text: "Cancel"
                },
                {
                    text: "Logout",
                    handler: function (data) {
                        // Clear the verification check interval.
                        clearInterval(_this.checkVerified);
                        // Set our routeGuard to true, to enable changing views.
                        _this.isLoggingOut = true;
                        // Log the user out.
                        _this.logoutProvider.logout();
                    }
                }
            ]
        })
            .present();
    };
    VerificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "page-verification",template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/verification/verification.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Verify Account</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div *ngIf="user">\n    <div class="profile">\n      <img src="{{user.img}}" tappable (click)="setPhoto()" />\n    </div>\n    <!-- Show icon of logged in provider -->\n    <h4>\n      <span>{{user.name}} </span>\n      <ion-icon name="md-flame" *ngIf="user.provider == \'Firebase\'" class="firebase"></ion-icon>\n      <ion-icon name="logo-facebook" *ngIf="user.provider == \'Facebook\'" class="facebook"></ion-icon>\n      <ion-icon name="logo-google" *ngIf="user.provider == \'Google\'" class="google"></ion-icon>\n    </h4>\n    <div class="divider"></div>\n    <p>An email confirmation has been sent to: <span>{{user.email}}</span>.</p>\n    <!-- Verification Menu -->\n    <ion-list>\n      <ion-item no-lines tappable (click)="sendEmailVerification()">\n        Resend Confirmation Email\n        <ion-icon name="md-contact" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="setEmail()">\n        Change Email Address\n        <ion-icon name="md-mail-open" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="logout()">\n        Logout\n        <ion-icon name="md-log-out" item-right></ion-icon>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/verification/verification.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__providers_logout__["a" /* LogoutProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alert__["a" /* AlertProvider */]])
    ], VerificationPage);
    return VerificationPage;
}());

//# sourceMappingURL=verification.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_logout__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_cordova_oauth_core__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_cordova_oauth_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_cordova_oauth_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_cordova_oauth_platform_cordova__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_cordova_oauth_platform_cordova___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_cordova_oauth_platform_cordova__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login_login__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var TrialPage = /** @class */ (function () {
    function TrialPage(navCtrl, alertCtrl, navParams, app, logoutProvider, loadingProvider, alertProvider, googlePlus) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.app = app;
        this.logoutProvider = logoutProvider;
        this.loadingProvider = loadingProvider;
        this.alertProvider = alertProvider;
        this.googlePlus = googlePlus;
        this.facebookProvider = new __WEBPACK_IMPORTED_MODULE_6_ng2_cordova_oauth_core__["Facebook"]({
            clientId: __WEBPACK_IMPORTED_MODULE_8__login__["a" /* Login */].facebookAppId,
            appScope: ["email"]
        });
        // Hook our logout provider with the app.
        this.logoutProvider.setApp(this.app);
        this.oauth = new __WEBPACK_IMPORTED_MODULE_7_ng2_cordova_oauth_platform_cordova__["OauthCordova"]();
    }
    // Shows popup to ask user for Facebook credential, afterwhich, upgrade the guest account to full account.
    TrialPage.prototype.linkFacebook = function () {
        var _this = this;
        this.oauth.logInVia(this.facebookProvider).then(function (success) {
            var credential = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"].FacebookAuthProvider.credential(success['access_token']);
            _this.loadingProvider.show();
            __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.link(credential)
                .then(function (success) {
                _this.loadingProvider.hide();
                // Check if emailVerification is enabled, if enabled, check and redirect to verificationPage
                if (__WEBPACK_IMPORTED_MODULE_8__login__["a" /* Login */].emailVerification) {
                    if (__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.emailVerified) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__login__["a" /* Login */].homePage);
                    }
                    else {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__login__["a" /* Login */].verificationPage);
                    }
                }
                else {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__login__["a" /* Login */].homePage);
                }
            })
                .catch(function (error) {
                //Show error
                _this.loadingProvider.hide();
                var code = error["code"];
                _this.alertProvider.showErrorMessage(code);
            });
        }, function (error) { });
    };
    // Shows popup to ask user for Google credential, afterwhich, upgrade the guest account to full account.
    TrialPage.prototype.linkGoogle = function () {
        var _this = this;
        this.loadingProvider.show();
        this.googlePlus.login({
            'webClientId': __WEBPACK_IMPORTED_MODULE_8__login__["a" /* Login */].googleClientId
        }).then(function (success) {
            var credential = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"].GoogleAuthProvider.credential(success['idToken'], null);
            __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.link(credential)
                .then(function (success) {
                _this.loadingProvider.hide();
                // Check if emailVerification is enabled, if enabled, check and redirect to verificationPage
                if (__WEBPACK_IMPORTED_MODULE_8__login__["a" /* Login */].emailVerification) {
                    if (__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.emailVerified) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__login__["a" /* Login */].homePage);
                    }
                    else {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__login__["a" /* Login */].verificationPage);
                    }
                }
                else {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__login__["a" /* Login */].homePage);
                }
            })
                .catch(function (error) {
                // Show error
                _this.loadingProvider.hide();
                var code = error["code"];
                _this.alertProvider.showErrorMessage(code);
            });
        }, function (error) { _this.loadingProvider.hide(); });
    };
    // Log the user out.
    TrialPage.prototype.logout = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Logout',
                    handler: function (data) {
                        _this.logoutProvider.logout().then(function (res) {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]);
                        });
                    }
                }
            ]
        }).present();
    };
    TrialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-trial',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/trial/trial.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div>\n    <div class="profile">\n      <img src="assets/images/profile.png" />\n    </div>\n    <h4>\n      <span>Guest User </span>\n      <ion-icon name="md-flame" class="firebase"></ion-icon>\n    </h4>\n    <div class="divider"></div>\n    <p>Logged in as Guest.</p>\n    <!-- Guest Menu -->\n    <ion-list>\n      <ion-item no-lines tappable (click)="linkFacebook()">\n        Link with Facebook\n        <ion-icon name="logo-facebook" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="linkGoogle()">\n        Link with Google\n        <ion-icon name="logo-google" item-right></ion-icon>\n      </ion-item>\n      <ion-item no-lines tappable (click)="logout()">\n        Logout\n        <ion-icon name="md-log-out" item-right></ion-icon>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/trial/trial.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__providers_logout__["a" /* LogoutProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__["a" /* GooglePlus */]])
    ], TrialPage);
    return TrialPage;
}());

//# sourceMappingURL=trial.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoCallPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the VideoCallPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
var VideoCallPage = /** @class */ (function () {
    function VideoCallPage(navCtrl, navParams, events, dataProvider, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.dataProvider = dataProvider;
        this.viewCtrl = viewCtrl;
        this.showRemoteVideo = false;
        this.showHangup = false;
        this.webRTCClient = this.dataProvider.getwebRTCClient();
        this.events.subscribe('userMediaSuccess', function (e) {
            _this.webRTCClient.addStreamInDiv(e.detail.stream, e.detail.callType, "mini", 'miniElt-' + e.detail.callId, {
                width: "128px",
                height: "128px"
            }, true);
        });
        this.events.subscribe('remoteStreamAdded', function (e) {
            _this.showHangup = true;
            _this.showRemoteVideo = true;
            setTimeout(function () {
                _this.webRTCClient.addStreamInDiv(e.detail.stream, e.detail.callType, "remote", 'remoteElt-' + e.detail.callId, {
                    width: "100%",
                    height: "100%"
                }, false);
            }, 2000);
        });
        this.events.subscribe('hangup', function (e) {
            _this.RemoveMediaElements(e.detail.callId);
        });
        this.events.subscribe('rejectCall', function (e) {
            _this.RemoveMediaElements(e);
        });
    }
    VideoCallPage.prototype.ionViewDidLoad = function () {
    };
    VideoCallPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe('userMediaSuccess');
        this.events.unsubscribe('remoteStreamAdded');
        this.events.unsubscribe('hangup');
        this.events.unsubscribe('rejectCall');
        this.HangUp();
        var callId = this.dataProvider.getIncomingCallid();
        this.RemoveMediaElements(callId);
    };
    VideoCallPage.prototype.RemoveMediaElements = function (callId) {
        this.webRTCClient.removeElementFromDiv('mini', 'miniElt-' + callId);
        this.webRTCClient.removeElementFromDiv('remote', 'remoteElt-' + callId);
        this.viewCtrl.dismiss();
    };
    VideoCallPage.prototype.HangUp = function () {
        var callId = this.dataProvider.getIncomingCallid();
        this.webRTCClient.hangUp(callId);
    };
    VideoCallPage.prototype.toggleAudioMute = function () {
        this.webRTCClient.toggleAudioMute();
        this.isAudioMute = this.webRTCClient.isAudioMuted();
    };
    VideoCallPage.prototype.toggleVideoMute = function () {
        this.webRTCClient.toggleVideoMute();
        this.isVideoMute = this.webRTCClient.isVideoMuted();
    };
    VideoCallPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-video-call',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/video-call/video-call.html"*/'<!--\n  Generated template for the VideoCallPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>video-call</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content >\n  <div  *ngIf="showHangup">\n    <ion-fab  bottom center (click)=\'toggleVideoMute()\' class="muteVideo">\n      <button ion-fab color="primary" *ngIf="isVideoMute"><img src="assets/video-off.png"></button> <!--- <ion-icon name="videocam-off"></ion-icon>-->\n      <button ion-fab color="primary" *ngIf="!isVideoMute"><ion-icon name="videocam"></ion-icon></button>\n    </ion-fab>\n    <ion-fab  bottom center  (click)=\'HangUp()\'>\n      <button ion-fab color="danger"><ion-icon name="call"></ion-icon></button>\n    </ion-fab>\n    <ion-fab  bottom center (click)=\'toggleAudioMute()\' class="muteAudio">\n      <button ion-fab color="primary" *ngIf="!isAudioMute"><ion-icon name="mic"></ion-icon></button>\n      <button ion-fab color="primary" *ngIf="isAudioMute"><ion-icon name="mic-off"></ion-icon></button>\n    </ion-fab>\n\n    <div id="remote" class="remoteVideo"  *ngIf="showRemoteVideo"></div>\n  </div>\n  <div id="mini" class="miniVideo"></div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/video-call/video-call.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], VideoCallPage);
    return VideoCallPage;
}());

//# sourceMappingURL=video-call.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FirebaseProvider = /** @class */ (function () {
    // Firebase Provider
    // This is the provider class for most of the Firebase updates in the app.
    function FirebaseProvider(angularDb, loadingProvider, alertProvider, dataProvider) {
        this.angularDb = angularDb;
        this.loadingProvider = loadingProvider;
        this.alertProvider = alertProvider;
        this.dataProvider = dataProvider;
    }
    // Send friend request to userId.
    FirebaseProvider.prototype.sendFriendRequest = function (userId) {
        var _this = this;
        var loggedInUserId = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid;
        this.loadingProvider.show();
        var requestsSent;
        // Use take(1) so that subscription will only trigger once.
        this.dataProvider.getRequests(loggedInUserId).take(1).subscribe(function (requests) {
            requestsSent = requests.requestsSent;
            if (!requestsSent) {
                requestsSent = [userId];
            }
            else {
                if (requestsSent.indexOf(userId) == -1)
                    requestsSent.push(userId);
            }
            // Add requestsSent information.
            _this.angularDb.object('/requests/' + loggedInUserId).update({
                requestsSent: requestsSent
            }).then(function (success) {
                var friendRequests;
                _this.dataProvider.getRequests(userId).take(1).subscribe(function (requests) {
                    friendRequests = requests.friendRequests;
                    if (!friendRequests) {
                        friendRequests = [loggedInUserId];
                    }
                    else {
                        if (friendRequests.indexOf(userId) == -1)
                            friendRequests.push(loggedInUserId);
                    }
                    // Add friendRequest information.
                    _this.angularDb.object('/requests/' + userId).update({
                        friendRequests: friendRequests
                    }).then(function (success) {
                        _this.loadingProvider.hide();
                        _this.alertProvider.showFriendRequestSent();
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                    });
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    // Cancel friend request sent to userId.
    FirebaseProvider.prototype.cancelFriendRequest = function (userId) {
        var _this = this;
        var loggedInUserId = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid;
        this.loadingProvider.show();
        var requestsSent;
        this.dataProvider.getRequests(loggedInUserId).take(1).subscribe(function (requests) {
            requestsSent = requests.requestsSent;
            requestsSent.splice(requestsSent.indexOf(userId), 1);
            // Update requestSent information.
            _this.angularDb.object('/requests/' + loggedInUserId).update({
                requestsSent: requestsSent
            }).then(function (success) {
                var friendRequests;
                _this.dataProvider.getRequests(userId).take(1).subscribe(function (requests) {
                    friendRequests = requests.friendRequests;
                    friendRequests.splice(friendRequests.indexOf(loggedInUserId), 1);
                    // Update friendRequests information.
                    _this.angularDb.object('/requests/' + userId).update({
                        friendRequests: friendRequests
                    }).then(function (success) {
                        _this.loadingProvider.hide();
                        _this.alertProvider.showFriendRequestRemoved();
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                    });
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    // Delete friend request.
    FirebaseProvider.prototype.deleteFriendRequest = function (userId) {
        var _this = this;
        var loggedInUserId = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid;
        this.loadingProvider.show();
        var friendRequests;
        this.dataProvider.getRequests(loggedInUserId).take(1).subscribe(function (requests) {
            friendRequests = requests.friendRequests;
            friendRequests.splice(friendRequests.indexOf(userId), 1);
            // Update friendRequests information.
            _this.angularDb.object('/requests/' + loggedInUserId).update({
                friendRequests: friendRequests
            }).then(function (success) {
                var requestsSent;
                _this.dataProvider.getRequests(userId).take(1).subscribe(function (requests) {
                    requestsSent = requests.requestsSent;
                    requestsSent.splice(requestsSent.indexOf(loggedInUserId), 1);
                    // Update requestsSent information.
                    _this.angularDb.object('/requests/' + userId).update({
                        requestsSent: requestsSent
                    }).then(function (success) {
                        _this.loadingProvider.hide();
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                    });
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
                //TODO ERROR
            });
        });
    };
    // Accept friend request.
    FirebaseProvider.prototype.acceptFriendRequest = function (userId) {
        var _this = this;
        var loggedInUserId = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid;
        // Delete friend request.
        this.deleteFriendRequest(userId);
        this.loadingProvider.show();
        this.dataProvider.getUser(loggedInUserId).take(1).subscribe(function (account) {
            var friends = account.friends;
            if (!friends) {
                friends = [userId];
            }
            else {
                friends.push(userId);
            }
            // Add both users as friends.
            _this.dataProvider.getUser(loggedInUserId).update({
                friends: friends
            }).then(function (success) {
                _this.dataProvider.getUser(userId).take(1).subscribe(function (account) {
                    var friends = account.friends;
                    if (!friends) {
                        friends = [loggedInUserId];
                    }
                    else {
                        friends.push(loggedInUserId);
                    }
                    _this.dataProvider.getUser(userId).update({
                        friends: friends
                    }).then(function (success) {
                        _this.loadingProvider.hide();
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                    });
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    // TimeLine
    FirebaseProvider.prototype.timeline = function (timelineId) {
        var _this = this;
        var loggedInUserId = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid;
        this.dataProvider.getUser(loggedInUserId).take(1).subscribe(function (account) {
            var timeline = account.timeline;
            if (!timeline) {
                timeline = [timelineId];
            }
            else {
                timeline.push(timelineId);
            }
            // Add both users as friends.
            _this.dataProvider.getUser(loggedInUserId).update({
                timeline: timeline
            }).then(function (success) {
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    // ==== Like postBy
    FirebaseProvider.prototype.likePost = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dataProvider.postLike(key).take(1).subscribe(function (likes) {
                var likes = likes;
                if (!likes.length) {
                    likes = [__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid];
                }
                else {
                    likes.push(__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid);
                }
                // Add both users as friends.
                _this.dataProvider.postLike(key).update(likes).then(function (success) {
                    // alert('sc')
                    resolve(true);
                }).catch(function (error) {
                    _this.loadingProvider.hide();
                    reject(false);
                });
            });
        });
    };
    // ==== Like postBy
    FirebaseProvider.prototype.delikePost = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dataProvider.postLike(key).take(1).subscribe(function (likes) {
                likes.splice(likes.indexOf(__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid), 1);
                if (likes.length) {
                    //alert(likes.length)
                    _this.angularDb.object('likes/' + key).remove();
                    _this.dataProvider.postLike(key).update(likes).then(function (success) {
                        // alert('sc')
                        resolve(true);
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                        reject(false);
                    });
                }
                else {
                    _this.angularDb.object('likes/' + key).remove();
                }
            });
        });
    };
    // ====== Dislike
    FirebaseProvider.prototype.dislikePost = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dataProvider.postdisLike(key).take(1).subscribe(function (dislikes) {
                var dislikes = dislikes;
                if (!dislikes.length) {
                    dislikes = [__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid];
                }
                else {
                    dislikes.push(__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid);
                }
                // Add both users as friends.
                _this.dataProvider.postdisLike(key).update(dislikes).then(function (success) {
                    // alert('sc')
                    resolve(true);
                }).catch(function (error) {
                    _this.loadingProvider.hide();
                    reject(false);
                });
            });
        });
    };
    // ===== Deldislike
    FirebaseProvider.prototype.dedislikePost = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dataProvider.postdisLike(key).take(1).subscribe(function (dislikes) {
                dislikes.splice(dislikes.indexOf(__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid), 1);
                if (dislikes.length) {
                    //alert(likes.length)
                    _this.angularDb.object('dislikes/' + key).remove();
                    _this.dataProvider.postdisLike(key).update(dislikes).then(function (success) {
                        // alert('sc')
                        resolve(true);
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                        reject(false);
                    });
                }
                else {
                    _this.angularDb.object('dislikes/' + key).remove();
                }
            });
        });
    };
    FirebaseProvider.prototype.commentPost = function (key, comment) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dataProvider.getComments(key).take(1).subscribe(function (comments) {
                var comments = comments;
                if (!comments) {
                    comments = [comment];
                }
                else {
                    comments.push(comment);
                }
                // Add both users as friends.
                _this.dataProvider.postComments(key).update(comments).then(function (success) {
                    resolve(true);
                }).catch(function (error) {
                    _this.loadingProvider.hide();
                    reject(false);
                });
            });
        });
    };
    FirebaseProvider.prototype.reportPost = function (post, loginUser) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dataProvider.getTimeline(post.$key).take(1).subscribe(function (suc) {
                console.log("timeline", suc);
                if (suc.postBy) {
                    _this.dataProvider.getReportPost(post.$key).take(1).subscribe(function (res) {
                        console.log("res", res);
                        var _res = res;
                        if (!_res.postId) {
                            _this.angularDb.object('/reportPost/' + post.$key).update({
                                dateCreated: new Date().toString(),
                                name: post.name,
                                postBy: post.postBy,
                                postText: post.postText,
                                image: post.image ? post.image : '',
                                location: post.location ? post.location : '',
                                avatar: post.avatar,
                                postId: post.$key,
                                reportedBy: [{
                                        name: loginUser.name,
                                        userId: loginUser.userId,
                                        image: loginUser.img,
                                        dateCreated: new Date().toString()
                                    }]
                            }).then(function (success) {
                                resolve(true);
                            }).catch(function (error) {
                                reject(false);
                            });
                        }
                        else {
                            var reportedBy = _res.reportedBy;
                            reportedBy.push({
                                name: loginUser.name,
                                userId: loginUser.userId,
                                image: loginUser.img,
                                dateCreated: new Date().toString()
                            });
                            _this.angularDb.object('/reportPost/' + post.$key).update({
                                reportedBy: reportedBy
                            }).then(function (success) {
                                resolve(true);
                            }).catch(function (error) {
                                reject(false);
                            });
                        }
                    });
                }
                else {
                    _this.alertProvider.showToast("Post alerday deleted by admin..");
                    reject(false);
                }
            });
        });
    };
    FirebaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_2__loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_3__alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_4__data__["a" /* DataProvider */]])
    ], FirebaseProvider);
    return FirebaseProvider;
}());

//# sourceMappingURL=firebase.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ImageProvider = /** @class */ (function () {
    function ImageProvider(angularDb, alertProvider, loadingProvider, camera, alertCtrl) {
        this.angularDb = angularDb;
        this.alertProvider = alertProvider;
        this.loadingProvider = loadingProvider;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.profilePhotoOptions = {
            quality: 50,
            targetWidth: 384,
            targetHeight: 384,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        };
        this.photoMessageOptions = {
            quality: 50,
            targetWidth: 384,
            targetHeight: 384,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: false,
            allowEdit: true,
        };
        this.groupPhotoOptions = {
            quality: 50,
            targetWidth: 384,
            targetHeight: 384,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        };
    }
    // Function to convert dataURI to Blob needed by Firebase
    ImageProvider.prototype.imgURItoBlob = function (dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {
            type: mimeString
        });
    };
    // Generate a random filename of length for the image to be uploaded
    ImageProvider.prototype.generateFilename = function () {
        var length = 8;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text + ".jpg";
    };
    // Set ProfilePhoto given the user and the cameraSourceType.
    // This function processes the imageURI returned and uploads the file on Firebase,
    // Finally the user data on the database is updated.
    ImageProvider.prototype.setProfilePhoto = function (user, sourceType) {
        var _this = this;
        this.profilePhotoOptions.sourceType = sourceType;
        this.loadingProvider.show();
        // Get picture from camera or gallery.
        this.camera.getPicture(this.profilePhotoOptions).then(function (imageData) {
            // Process the returned imageURI.
            var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
            var metadata = {
                'contentType': imgBlob.type
            };
            // Generate filename and upload to Firebase Storage.
            __WEBPACK_IMPORTED_MODULE_5_firebase__["storage"]().ref().child('images/' + user.userId + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                // Delete previous profile photo on Storage if it exists.
                _this.deleteImageFile(user.img);
                // URL of the uploaded image!
                var url = snapshot.metadata.downloadURLs[0];
                var profile = {
                    displayName: user.name,
                    photoURL: url
                };
                // Update Firebase User.
                __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.updateProfile(profile)
                    .then(function (success) {
                    // Update User Data on Database.
                    _this.angularDb.object('/accounts/' + user.userId).update({
                        img: url
                    }).then(function (success) {
                        _this.loadingProvider.hide();
                        _this.alertProvider.showProfileUpdatedMessage();
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                        _this.alertProvider.showErrorMessage('profile/error-change-photo');
                    });
                })
                    .catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage('profile/error-change-photo');
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
                _this.alertProvider.showErrorMessage('image/error-image-upload');
            });
        }).catch(function (error) {
            _this.loadingProvider.hide();
        });
    };
    // Upload and set the group object's image.
    ImageProvider.prototype.setGroupPhoto = function (group, sourceType) {
        var _this = this;
        this.groupPhotoOptions.sourceType = sourceType;
        this.loadingProvider.show();
        // Get picture from camera or gallery.
        this.camera.getPicture(this.groupPhotoOptions).then(function (imageData) {
            // Process the returned imageURI.
            var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
            var metadata = {
                'contentType': imgBlob.type
            };
            __WEBPACK_IMPORTED_MODULE_5_firebase__["storage"]().ref().child('images/' + __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                _this.deleteImageFile(group.img);
                // URL of the uploaded image!
                var url = snapshot.metadata.downloadURLs[0];
                group.img = url;
                _this.loadingProvider.hide();
            }).catch(function (error) {
                _this.loadingProvider.hide();
                _this.alertProvider.showErrorMessage('image/error-image-upload');
            });
        }).catch(function (error) {
            _this.loadingProvider.hide();
        });
    };
    // Set group photo and return the group object as promise.
    ImageProvider.prototype.setGroupPhotoPromise = function (group, sourceType) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.groupPhotoOptions.sourceType = sourceType;
            _this.loadingProvider.show();
            // Get picture from camera or gallery.
            _this.camera.getPicture(_this.groupPhotoOptions).then(function (imageData) {
                // Process the returned imageURI.
                var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
                var metadata = {
                    'contentType': imgBlob.type
                };
                __WEBPACK_IMPORTED_MODULE_5_firebase__["storage"]().ref().child('images/' + __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                    _this.deleteImageFile(group.img);
                    // URL of the uploaded image!
                    var url = snapshot.metadata.downloadURLs[0];
                    group.img = url;
                    _this.loadingProvider.hide();
                    resolve(group);
                }).catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage('image/error-image-upload');
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    //Delete the image given the url.
    ImageProvider.prototype.deleteImageFile = function (path) {
        var fileName = path.substring(path.lastIndexOf('%2F') + 3, path.lastIndexOf('?'));
        __WEBPACK_IMPORTED_MODULE_5_firebase__["storage"]().ref().child('images/' + __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid + '/' + fileName).delete().then(function () { }).catch(function (error) { });
    };
    //Delete the user.img given the user.
    ImageProvider.prototype.deleteUserImageFile = function (user) {
        var fileName = user.img.substring(user.img.lastIndexOf('%2F') + 3, user.img.lastIndexOf('?'));
        __WEBPACK_IMPORTED_MODULE_5_firebase__["storage"]().ref().child('images/' + user.userId + '/' + fileName).delete().then(function () { }).catch(function (error) { });
    };
    // Delete group image file on group storage reference.
    ImageProvider.prototype.deleteGroupImageFile = function (groupId, path) {
        var fileName = path.substring(path.lastIndexOf('%2F') + 3, path.lastIndexOf('?'));
        __WEBPACK_IMPORTED_MODULE_5_firebase__["storage"]().ref().child('images/' + groupId + '/' + fileName).delete().then(function () { }).catch(function (error) { });
    };
    // Upload photo message and return the url as promise.
    ImageProvider.prototype.uploadPhotoMessage = function (conversationId, sourceType) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.photoMessageOptions.sourceType = sourceType;
            _this.loadingProvider.show();
            // Get picture from camera or gallery.
            _this.camera.getPicture(_this.photoMessageOptions).then(function (imageData) {
                // Process the returned imageURI.
                var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
                var metadata = {
                    'contentType': imgBlob.type
                };
                // Generate filename and upload to Firebase Storage.
                __WEBPACK_IMPORTED_MODULE_5_firebase__["storage"]().ref().child('images/' + conversationId + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                    // URL of the uploaded image!
                    var url = snapshot.metadata.downloadURLs[0];
                    _this.loadingProvider.hide();
                    resolve(url);
                }).catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage('image/error-image-upload');
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    // Upload group photo message and return a promise as url.
    ImageProvider.prototype.uploadGroupPhotoMessage = function (groupId, sourceType) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.photoMessageOptions.sourceType = sourceType;
            _this.loadingProvider.show();
            // Get picture from camera or gallery.
            _this.camera.getPicture(_this.photoMessageOptions).then(function (imageData) {
                // Process the returned imageURI.
                var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
                var metadata = {
                    'contentType': imgBlob.type
                };
                // Generate filename and upload to Firebase Storage.
                __WEBPACK_IMPORTED_MODULE_5_firebase__["storage"]().ref().child('images/' + groupId + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                    // URL of the uploaded image!
                    var url = snapshot.metadata.downloadURLs[0];
                    _this.loadingProvider.hide();
                    resolve(url);
                }).catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage('image/error-image-upload');
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    // ======== set post image ========
    ImageProvider.prototype.setImage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.alert = _this.alertCtrl.create({
                title: 'Send Photo Message',
                message: 'Do you want to take a photo or choose from your photo gallery?',
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function (data) { }
                    },
                    {
                        text: 'Choose from Gallery',
                        handler: function () {
                            _this.photoMessageOptions.sourceType = _this.camera.PictureSourceType.PHOTOLIBRARY;
                            _this.camera.getPicture(_this.photoMessageOptions).then(function (imageData) {
                                resolve("data:image/jpeg;base64," + imageData);
                            });
                        }
                    },
                    {
                        text: 'Take Photo',
                        handler: function () {
                            _this.photoMessageOptions.sourceType = _this.camera.PictureSourceType.CAMERA;
                            _this.camera.getPicture(_this.photoMessageOptions).then(function (imageData) {
                                resolve("data:image/jpeg;base64," + imageData);
                            });
                        }
                    }
                ]
            }).present();
        });
    };
    // ======= upload image in post folder ====
    ImageProvider.prototype.uploadPostImage = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var imgBlob = _this.imgURItoBlob(url);
            var metadata = {
                'contentType': imgBlob.type
            };
            // Generate filename and upload to Firebase Storage.
            __WEBPACK_IMPORTED_MODULE_5_firebase__["storage"]().ref().child('images/post/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                // URL of the uploaded image!
                var url = snapshot.metadata.downloadURLs[0];
                resolve(url);
            }).catch(function (error) {
                _this.alertProvider.showErrorMessage('image/error-image-upload');
                reject(error);
            });
        });
    };
    ImageProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1__alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_3__loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], ImageProvider);
    return ImageProvider;
}());

//# sourceMappingURL=image.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__message_message__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__image_modal_image_modal__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserInfoPage = /** @class */ (function () {
    // UserInfoPage
    // This is the page where the user can view user information, and do appropriate actions based on their relation to the current logged in user.
    function UserInfoPage(navCtrl, navParams, modalCtrl, dataProvider, loadingProvider, alertCtrl, firebaseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
        this.alertCtrl = alertCtrl;
        this.firebaseProvider = firebaseProvider;
    }
    UserInfoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userId = this.navParams.get('userId');
        this.loadingProvider.show();
        // Get user info.
        this.dataProvider.getUser(this.userId).subscribe(function (user) {
            _this.user = user;
            _this.loadingProvider.hide();
        });
        // Get friends of current logged in user.
        this.dataProvider.getUser(__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid).subscribe(function (user) {
            _this.friends = user.friends;
        });
        // Get requests of current logged in user.
        this.dataProvider.getRequests(__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid).subscribe(function (requests) {
            _this.friendRequests = requests.friendRequests;
            _this.requestsSent = requests.requestsSent;
        });
    };
    // Back
    UserInfoPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    // Enlarge user's profile image.
    UserInfoPage.prototype.enlargeImage = function (img) {
        var imageModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__image_modal_image_modal__["a" /* ImageModalPage */], { img: img });
        imageModal.present();
    };
    // Accept friend request.
    UserInfoPage.prototype.acceptFriendRequest = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm Friend Request',
            message: 'Do you want to accept <b>' + this.user.name + '</b> as your friend?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Accept',
                    handler: function () {
                        _this.firebaseProvider.acceptFriendRequest(_this.userId);
                    }
                }
            ]
        }).present();
    };
    // Deny friend request.
    UserInfoPage.prototype.rejectFriendRequest = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Reject Friend Request',
            message: 'Do you want to reject <b>' + this.user.name + '</b> as your friend?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Reject',
                    handler: function () {
                        _this.firebaseProvider.deleteFriendRequest(_this.userId);
                    }
                }
            ]
        }).present();
    };
    // Cancel friend request sent.
    UserInfoPage.prototype.cancelFriendRequest = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Friend Request Pending',
            message: 'Do you want to delete your friend request to <b>' + this.user.name + '</b>?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.firebaseProvider.cancelFriendRequest(_this.userId);
                    }
                }
            ]
        }).present();
    };
    // Send friend request.
    UserInfoPage.prototype.sendFriendRequest = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Send Friend Request',
            message: 'Do you want to send friend request to <b>' + this.user.name + '</b>?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Send',
                    handler: function () {
                        _this.firebaseProvider.sendFriendRequest(_this.userId);
                    }
                }
            ]
        }).present();
    };
    // Open chat with this user.
    UserInfoPage.prototype.sendMessage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__message_message__["a" /* MessagePage */], { userId: this.userId });
    };
    // Check if user can be added, meaning user is not yet friends nor has sent/received any friend requests.
    UserInfoPage.prototype.canAdd = function () {
        if (this.friendRequests) {
            if (this.friendRequests.indexOf(this.userId) > -1) {
                return false;
            }
        }
        if (this.requestsSent) {
            if (this.requestsSent.indexOf(this.userId) > -1) {
                return false;
            }
        }
        if (this.friends) {
            if (this.friends.indexOf(this.userId) > -1) {
                return false;
            }
        }
        return true;
    };
    // Un friend 
    UserInfoPage.prototype.unFriend = function (userId) {
        this.dataProvider.unFriend(userId);
    };
    UserInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-user-info',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/user-info/user-info.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <ion-buttons>\n      <button ion-button tappable (click)="back()">Back</button>\n    </ion-buttons>\n    <ion-title *ngIf="user">{{user.name}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!-- User Info -->\n  <div *ngIf="user">\n    <div class="profile">\n      <img src="{{user.img}}" tappable (click)="enlargeImage(user.img)" />\n    </div>\n    <h4>\n      <span>{{user.name}} </span>\n      <ion-icon name="md-flame" *ngIf="user.provider == \'Firebase\'" class="firebase"></ion-icon>\n      <ion-icon name="logo-facebook" *ngIf="user.provider == \'Facebook\'" class="facebook"></ion-icon>\n      <ion-icon name="logo-google" *ngIf="user.provider == \'Google\'" class="google"></ion-icon>\n    </h4>\n    <p class="username">@{{user.username}}</p>\n    <p class="description">{{user.description}}</p>\n    <div class="divider"></div>\n    <div class="center">\n      <!-- Show actions based on the status of the user in relation to the current logged in user. -->\n      <div *ngIf="friendRequests && friendRequests.indexOf(user.$key) > -1">\n        <p class="info">Sent you a friend request.</p>\n        <button ion-button icon-only class="danger" tappable (click)="rejectFriendRequest()"><ion-icon name="md-close"></ion-icon></button>\n        <button ion-button icon-only class="success" tappable (click)="acceptFriendRequest()"><ion-icon name="md-checkmark"></ion-icon></button>\n      </div>\n      <div *ngIf="requestsSent && requestsSent.indexOf(user.$key) > -1">\n        <p class="info">Friend request sent.</p>\n        <button ion-button class="dark" tappable (click)="cancelFriendRequest()">Cancel Friend Request</button>\n      </div>\n      <div *ngIf="canAdd()">\n        <p class="info">You are not yet friends.</p>\n        <button ion-button class="primary" tappable (click)="sendFriendRequest()">Send Friend Request</button>\n      </div>\n      <div *ngIf="friends && friends.indexOf(user.$key) > -1">\n        <p class="info">You are already friends.</p>\n        <button ion-button class="primary" tappable (click)="sendMessage()">Send Message</button>\n        <button ion-button class="primary" tappable (click)="unFriend(user.$key)">Unfriend</button>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/user-info/user-info.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_firebase__["a" /* FirebaseProvider */]])
    ], UserInfoPage);
    return UserInfoPage;
}());

//# sourceMappingURL=user-info.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(473);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export myCustomAudioProviderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_keyboard__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_maps__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_verification_verification__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_trial_trial__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_tabs_tabs__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_messages_messages__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_groups_groups__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_friends_friends__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_search_people_search_people__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_requests_requests__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_user_info_user_info__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_new_message_new_message__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_message_message__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_new_group_new_group__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_group_group__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_add_post_add_post__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_update_contact_update_contact__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_timeline_timeline__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_group_info_group_info__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_add_members_add_members__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_image_modal_image_modal__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_login__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_logout__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_image__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__providers_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__providers_country_code__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_comments_comments__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_video_call_video_call__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_users_users__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_reported_post_reported_post__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_angularfire2__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47_firebase_app__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_47_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_native_native_audio__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_admob_free__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ionic_native_social_sharing__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_contacts__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ionic_storage__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__ionic_native_file__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__ionic_native_media_capture__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55_ionic_audio__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__ionic_native_in_app_browser__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__ionic_native_badge__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__login__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pipes_friend__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pipes_search__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__pipes_conversation__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__pipes_date__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__pipes_group__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__providers_video__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













































// import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';



// import { GooglePlus } from '@ionic-native/google-plus';

















function myCustomAudioProviderFactory() {
    return window.hasOwnProperty("cordova")
        ? new __WEBPACK_IMPORTED_MODULE_55_ionic_audio__["b" /* CordovaMediaProvider */]()
        : new __WEBPACK_IMPORTED_MODULE_55_ionic_audio__["d" /* WebAudioProvider */]();
}
__WEBPACK_IMPORTED_MODULE_47_firebase_app__["initializeApp"](__WEBPACK_IMPORTED_MODULE_58__login__["a" /* Login */].firebaseConfig);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_verification_verification__["a" /* VerificationPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_trial_trial__["a" /* TrialPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_messages_messages__["a" /* MessagesPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_groups_groups__["a" /* GroupsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_friends_friends__["a" /* FriendsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_search_people_search_people__["a" /* SearchPeoplePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_requests_requests__["a" /* RequestsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_user_info_user_info__["a" /* UserInfoPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_new_message_new_message__["a" /* NewMessagePage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_message_message__["a" /* MessagePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_new_group_new_group__["a" /* NewGroupPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_group_group__["a" /* GroupPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_group_info_group_info__["a" /* GroupInfoPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_add_members_add_members__["a" /* AddMembersPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_image_modal_image_modal__["a" /* ImageModalPage */],
                __WEBPACK_IMPORTED_MODULE_59__pipes_friend__["a" /* FriendPipe */],
                __WEBPACK_IMPORTED_MODULE_61__pipes_conversation__["a" /* ConversationPipe */],
                __WEBPACK_IMPORTED_MODULE_60__pipes_search__["a" /* SearchPipe */],
                __WEBPACK_IMPORTED_MODULE_62__pipes_date__["a" /* DateFormatPipe */],
                __WEBPACK_IMPORTED_MODULE_63__pipes_group__["a" /* GroupPipe */],
                __WEBPACK_IMPORTED_MODULE_29__pages_timeline_timeline__["a" /* TimelinePage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_add_post_add_post__["a" /* AddPostPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_comments_comments__["a" /* CommentsPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_video_call_video_call__["a" /* VideoCallPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_update_contact_update_contact__["a" /* UpdateContactPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_reported_post_reported_post__["a" /* ReportedPostPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_users_users__["a" /* UsersPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_55_ionic_audio__["c" /* IonicAudioModule */].forRoot(__WEBPACK_IMPORTED_MODULE_55_ionic_audio__["e" /* defaultAudioProviderFactory */]),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {
                    mode: "ios",
                    scrollAssist: false,
                    autoFocusAssist: false
                }, {
                    links: [
                        { loadChildren: '../pages/add-post/add-post.module#AddPostPageModule', name: 'AddPostPage', segment: 'add-post', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/comments/comments.module#CommentsPageModule', name: 'CommentsPage', segment: 'comments', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reported-post/reported-post.module#ReportedPostPageModule', name: 'ReportedPostPage', segment: 'reported-post', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/timeline/timeline.module#TimelinePageModule', name: 'TimelinePage', segment: 'timeline', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/users/users.module#UsersPageModule', name: 'UsersPage', segment: 'users', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_52__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_45_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_58__login__["a" /* Login */].firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_46_angularfire2_database__["b" /* AngularFireDatabaseModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_verification_verification__["a" /* VerificationPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_trial_trial__["a" /* TrialPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_messages_messages__["a" /* MessagesPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_groups_groups__["a" /* GroupsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_friends_friends__["a" /* FriendsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_search_people_search_people__["a" /* SearchPeoplePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_requests_requests__["a" /* RequestsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_user_info_user_info__["a" /* UserInfoPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_new_message_new_message__["a" /* NewMessagePage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_message_message__["a" /* MessagePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_new_group_new_group__["a" /* NewGroupPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_group_group__["a" /* GroupPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_group_info_group_info__["a" /* GroupInfoPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_add_members_add_members__["a" /* AddMembersPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_image_modal_image_modal__["a" /* ImageModalPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_timeline_timeline__["a" /* TimelinePage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_add_post_add_post__["a" /* AddPostPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_comments_comments__["a" /* CommentsPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_video_call_video_call__["a" /* VideoCallPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_update_contact_update_contact__["a" /* UpdateContactPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_reported_post_reported_post__["a" /* ReportedPostPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_users_users__["a" /* UsersPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_56__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_54__ionic_native_media_capture__["a" /* MediaCapture */],
                __WEBPACK_IMPORTED_MODULE_53__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__["a" /* Toast */],
                __WEBPACK_IMPORTED_MODULE_40__providers_country_code__["a" /* CountryCodeProvider */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_51__ionic_native_contacts__["a" /* Contacts */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_49__ionic_native_admob_free__["a" /* AdMobFree */],
                __WEBPACK_IMPORTED_MODULE_57__ionic_native_badge__["a" /* Badge */],
                __WEBPACK_IMPORTED_MODULE_50__ionic_native_social_sharing__["a" /* SocialSharing */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_33__providers_login__["a" /* LoginProvider */],
                __WEBPACK_IMPORTED_MODULE_34__providers_logout__["a" /* LogoutProvider */],
                __WEBPACK_IMPORTED_MODULE_35__providers_loading__["a" /* LoadingProvider */],
                __WEBPACK_IMPORTED_MODULE_36__providers_alert__["a" /* AlertProvider */],
                __WEBPACK_IMPORTED_MODULE_37__providers_image__["a" /* ImageProvider */],
                __WEBPACK_IMPORTED_MODULE_38__providers_data__["a" /* DataProvider */],
                __WEBPACK_IMPORTED_MODULE_39__providers_firebase__["a" /* FirebaseProvider */],
                __WEBPACK_IMPORTED_MODULE_48__ionic_native_native_audio__["a" /* NativeAudio */],
                __WEBPACK_IMPORTED_MODULE_64__providers_video__["a" /* VideoProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LogoutProvider = /** @class */ (function () {
    // Logout Provider
    // This is the provider class for logging out.
    // Before logout function can be used it's important to set the app to the Provider
    // by calling setApp(app) in the constructor of the controller that needs the logout functionality.
    function LogoutProvider(app, loadingProvider, dataProvider) {
        this.app = app;
        this.loadingProvider = loadingProvider;
        this.dataProvider = dataProvider;
    }
    // Hooks the app to this provider, this is needed to clear the navigation views when logging out.
    LogoutProvider.prototype.setApp = function (app) {
        this.app = app;
    };
    // Logs the user out on Firebase, and clear navigation stacks.
    // It's important to call setApp(app) on the constructor of the controller that calls this function.
    LogoutProvider.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadingProvider.show();
            // Sign the user out on Firebase
            __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().signOut().then(function (success) {
                // Clear navigation stacks
                _this.app.getRootNav().popToRoot().then(function () {
                    _this.loadingProvider.hide();
                    resolve(true);
                    // Restart the entire app
                    //document.location.href = 'index.html';
                });
            });
        });
    };
    LogoutProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_3__data__["a" /* DataProvider */]])
    ], LogoutProvider);
    return LogoutProvider;
}());

//# sourceMappingURL=logout.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ImageModalPage = /** @class */ (function () {
    function ImageModalPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ImageModalPage.prototype.ionViewDidLoad = function () {
        this.image = this.navParams.get('img');
    };
    ImageModalPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    ImageModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-image-modal',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/image-modal/image-modal.html"*/'<ion-content>\n  <div class="content" (click)="close()" tappable>\n    <img src={{image}}/>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/image-modal/image-modal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], ImageModalPage);
    return ImageModalPage;
}());

//# sourceMappingURL=image-modal.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_login__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validator__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(282);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = /** @class */ (function () {
    // LoginPage
    // This is the page where the user can register and login to our app.
    // It's important to initialize the loginProvider here and setNavController as it will direct the routes of our app.
    function LoginPage(navCtrl, loginProvider, iab, formBuilder) {
        this.navCtrl = navCtrl;
        this.loginProvider = loginProvider;
        this.iab = iab;
        this.formBuilder = formBuilder;
        // It's important to hook the navController to our loginProvider.
        this.loginProvider.setNavController(this.navCtrl);
        // Create our forms and their validators based on validators set on validator.ts.
        this.emailPasswordForm = formBuilder.group({
            email: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].emailValidator,
            password: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].passwordValidator
        });
        this.emailForm = formBuilder.group({
            email: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].emailValidator
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        // Set view mode to main.
        this.mode = 'main';
    };
    // Call loginProvider and login the user with email and password.
    // You may be wondering where the login function for Facebook and Google are.
    // They are called directly from the html markup via loginProvider.facebookLogin() and loginProvider.googleLogin().
    LoginPage.prototype.loginWithPhone = function () {
        var _this = this;
        //this.loginProvider.emailLogin(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
        // FacebookAccountKit.mobileLogin(function (response) { alert(JSON.stringify(response)); }, function (error) { console.log(error) });
        var options = {
            useAccessToken: true,
            defaultCountryCode: "IN",
            facebookNotificationsEnabled: true,
        };
        AccountKitPlugin.loginWithPhoneNumber(options, (function (res) {
            AccountKitPlugin.getAccount(function (res1) {
                console.log('phoneEmail', res1.phoneNumber);
                var phoneEmail = res1.phoneNumber.toString() + '@gmail.com';
                var pass = res1.phoneNumber;
                _this.loginProvider.phoneLogin(phoneEmail, pass);
            });
        }), (function (err) {
            alert('err');
        }));
    };
    // Call loginProvider and register the user with email and password.
    LoginPage.prototype.register = function () {
        this.loginProvider.emailRegister(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
    };
    LoginPage.prototype.login = function () {
        this.loginProvider.emailLogin(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
    };
    // Call loginProvider and send a password reset email.
    LoginPage.prototype.forgotPassword = function () {
        this.loginProvider.sendPasswordReset(this.emailForm.value["email"]);
        this.clearForms();
    };
    // Clear the forms.
    LoginPage.prototype.clearForms = function () {
        this.emailPasswordForm.reset();
        this.emailForm.reset();
    };
    LoginPage.prototype.termcondition = function () {
        console.log("termcondition");
        var browser = this.iab.create('https://www.worlddove.com/documents/eula.pdf');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/login/login.html"*/'<ion-content>\n  <div class="top">\n    <img src="assets/logo.png" >\n  </div>\n  <!-- Social Login Buttons -->\n  <div class="bottom">\n    <div class="form" *ngIf="mode == \'main\'">\n      <div>\n         <form [formGroup]="emailPasswordForm">\n          <ion-list>\n            <ion-item no-lines>\n              <ion-input type="email" formControlName="email" placeholder="Email Address"></ion-input>\n            </ion-item>\n            <ion-item no-lines>\n              <ion-input type="password" formControlName="password" placeholder="Create Password"></ion-input>\n            </ion-item>\n            <button ion-button icon-left class="dark" tappable (click)="login()" [disabled]="!emailPasswordForm.valid">LOGIN</button>\n          </ion-list>\n        </form>\n        <button ion-button  icon-left class="facebook" class="facebook" tappable (click)="loginProvider.facebookLogin()"><ion-icon name="logo-facebook"></ion-icon>LOGIN WITH FACEBOOK</button>\n        <button ion-button icon-left class="google" class="google" tappable (click)="loginProvider.googleLogin()"><ion-icon name="logo-google"></ion-icon>LOGIN WITH GOOGLE</button>\n        <button ion-button icon-left class="dark" tappable (click)="loginWithPhone()"><ion-icon name="md-call"></ion-icon>Signup with Phone</button>\n        <p tappable (click)="clearForms(); mode = \'register\'">Don\'t Have an Account? <b>Sign up</b></p>\n        <p tappable (click)="clearForms(); mode = \'forgotPassword\'">Forgot your Password?</p>\n      </div>\n    </div>\n    <!-- Sign Form -->\n    <div class="form" *ngIf="mode == \'register\'">\n      <button class="clear" ion-button icon-only tappable (click)="mode = \'main\'"><ion-icon name="md-close"></ion-icon></button>\n      <form [formGroup]="emailPasswordForm">\n        <ion-list>\n          <ion-item no-lines>\n            <ion-input type="email" formControlName="email" placeholder="Email Address"></ion-input>\n          </ion-item>\n          <ion-item no-lines>\n            <ion-input type="password" formControlName="password" placeholder="Your Password"></ion-input>\n          </ion-item>\n        </ion-list>\n        <button ion-button icon-left class="dark" tappable (click)="register()" [disabled]="!emailPasswordForm.valid">SIGN UP</button>\n      </form>\n    </div>\n\n    <!-- Forgot Password Form -->\n    <div class="form" *ngIf="mode == \'forgotPassword\'">\n      <button class="clear icon-right" ion-button icon-right icon-only tappable (click)="clearForms(); mode = \'main\'"><ion-icon name="md-close"></ion-icon></button>\n      <form [formGroup]="emailForm">\n        <ion-list>\n          <ion-item no-lines>\n            <ion-input type="email" formControlName="email" placeholder="Your Email Address"></ion-input>\n          </ion-item>\n        </ion-list>\n        <button ion-button icon-left class="dark" tappable (click)="forgotPassword()" [disabled]="!emailForm.valid">Reset Password</button>\n      </form>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_login__["a" /* LoginProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_video_call_video_call__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_admob_free__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_video__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








//Pages




var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, keyboard, modalCtrl, events, admobFree, videoProvider, angularDb, dataProvider) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.admobFree = admobFree;
        this.videoProvider = videoProvider;
        this.angularDb = angularDb;
        this.dataProvider = dataProvider;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            _this.events.subscribe('openVideocall', function () {
                var profileModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_video_call_video_call__["a" /* VideoCallPage */]);
                profileModal.present();
            });
            _this.dataProvider.getData('userData').then(function (data) {
                var userData = data;
                _this.userData = userData;
                if (userData) {
                    var _userData = userData;
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */];
                    _this.angularDb.object('/accounts/' + _userData.userId).update({
                        isOnline: true
                    }).then(function (success) {
                    }).catch(function (error) {
                        //this.alertProvider.showErrorMessage('profile/error-update-profile');
                    });
                    // if(_userData.phoneNumber == '' || !_userData.phoneNumber){
                    //     let profileModal = this.modalCtrl.create(UpdateContactPage,{userData:_userData});
                    //     profileModal.present();
                    // }
                    // this.dataProvider.getContact().then(data=>{
                    //   if(data && this.userData.phoneNumber!=''){
                    //       this.dataProvider.setContactWithCountryCode(this.userData.countryCode)
                    //   }
                    // });
                    _this.videoProvider.InitializingRTC(userData);
                }
                else {
                    // this.dataProvider.getContact().then(data=>{
                    //   if(data && this.userData!=''){
                    //       this.dataProvider.setContactWithCountryCode(this.userData.countryCode)
                    //   }
                    // });
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
                }
            });
            // const bannerConfig: AdMobFreeBannerConfig = {
            //  // add your config here
            //  // for the sake of this example we will just use the test config
            //  id:'ca-app-pub-8355081094607232~7474863280',
            //  isTesting: true,
            //  autoShow: true,
            //  overlap:false
            // };
            // this.admobFree.banner.config(bannerConfig);
            // this.admobFree.banner.prepare()
            //   .then(() => {
            //     // banner Ad is ready
            //     // if we set autoShow to false, then we will need to call the show method here
            //   })
            //   .catch(e => console.log(e));
            //   keyboard.hideKeyboardAccessoryBar(false);
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_admob_free__["a" /* AdMobFree */],
            __WEBPACK_IMPORTED_MODULE_11__providers_video__["a" /* VideoProvider */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_10__providers_data__["a" /* DataProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FriendPipe = /** @class */ (function () {
    function FriendPipe() {
    }
    // FriendPipe
    // Filter friend by name or username.
    FriendPipe.prototype.transform = function (friends, search) {
        if (!friends) {
            return;
        }
        else if (!search) {
            return friends;
        }
        else {
            var term_1 = search.toLowerCase();
            return friends.filter(function (friend) { return friend.name.toLowerCase().indexOf(term_1) > -1 || friend.username.toLowerCase().indexOf(term_1) > -1; });
        }
    };
    FriendPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
            name: 'friendFilter'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    ], FriendPipe);
    return FriendPipe;
}());

//# sourceMappingURL=friend.js.map

/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    // SearchPipe
    // Filter user search results for name or username excluding the excludedIds.
    SearchPipe.prototype.transform = function (accounts, data) {
        var excludedIds = data[0];
        var term = data[1];
        if (!accounts) {
            return;
        }
        else if (!excludedIds) {
            return accounts;
        }
        else if (excludedIds && !term) {
            return accounts.filter(function (account) { return excludedIds.indexOf(account.userId) == -1; });
        }
        else {
            term = term.toLowerCase();
            return accounts.filter(function (account) { return excludedIds.indexOf(account.userId) == -1 && (account.name.toLowerCase().indexOf(term) > -1 || account.username.toLowerCase().indexOf(term) > -1); });
        }
    };
    SearchPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
            name: 'searchFilter'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    ], SearchPipe);
    return SearchPipe;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConversationPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ConversationPipe = /** @class */ (function () {
    function ConversationPipe() {
    }
    // ConversationPipe
    // Filter conversation based on friend's name or username.
    ConversationPipe.prototype.transform = function (conversations, search) {
        if (!conversations) {
            return;
        }
        else if (!search) {
            return conversations;
        }
        else {
            var term_1 = search.toLowerCase();
            return conversations.filter(function (conversation) { return conversation.friend.name.toLowerCase().indexOf(term_1) > -1 || conversation.friend.username.toLowerCase().indexOf(term_1) > -1; });
        }
    };
    ConversationPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
            name: 'conversationFilter'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    ], ConversationPipe);
    return ConversationPipe;
}());

//# sourceMappingURL=conversation.js.map

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateFormatPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DateFormatPipe = /** @class */ (function () {
    function DateFormatPipe() {
    }
    // DateFormatPipe
    // Show moment.js dateFormat for time elapsed.
    DateFormatPipe.prototype.transform = function (date, args) {
        return __WEBPACK_IMPORTED_MODULE_1_moment__(new Date(date)).fromNow();
    };
    DateFormatPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
            name: 'DateFormat'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    ], DateFormatPipe);
    return DateFormatPipe;
}());

//# sourceMappingURL=date.js.map

/***/ }),

/***/ 610:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 325,
	"./af.js": 325,
	"./ar": 326,
	"./ar-dz": 327,
	"./ar-dz.js": 327,
	"./ar-kw": 328,
	"./ar-kw.js": 328,
	"./ar-ly": 329,
	"./ar-ly.js": 329,
	"./ar-ma": 330,
	"./ar-ma.js": 330,
	"./ar-sa": 331,
	"./ar-sa.js": 331,
	"./ar-tn": 332,
	"./ar-tn.js": 332,
	"./ar.js": 326,
	"./az": 333,
	"./az.js": 333,
	"./be": 334,
	"./be.js": 334,
	"./bg": 335,
	"./bg.js": 335,
	"./bm": 336,
	"./bm.js": 336,
	"./bn": 337,
	"./bn.js": 337,
	"./bo": 338,
	"./bo.js": 338,
	"./br": 339,
	"./br.js": 339,
	"./bs": 340,
	"./bs.js": 340,
	"./ca": 341,
	"./ca.js": 341,
	"./cs": 342,
	"./cs.js": 342,
	"./cv": 343,
	"./cv.js": 343,
	"./cy": 344,
	"./cy.js": 344,
	"./da": 345,
	"./da.js": 345,
	"./de": 346,
	"./de-at": 347,
	"./de-at.js": 347,
	"./de-ch": 348,
	"./de-ch.js": 348,
	"./de.js": 346,
	"./dv": 349,
	"./dv.js": 349,
	"./el": 350,
	"./el.js": 350,
	"./en-SG": 351,
	"./en-SG.js": 351,
	"./en-au": 352,
	"./en-au.js": 352,
	"./en-ca": 353,
	"./en-ca.js": 353,
	"./en-gb": 354,
	"./en-gb.js": 354,
	"./en-ie": 355,
	"./en-ie.js": 355,
	"./en-il": 356,
	"./en-il.js": 356,
	"./en-nz": 357,
	"./en-nz.js": 357,
	"./eo": 358,
	"./eo.js": 358,
	"./es": 359,
	"./es-do": 360,
	"./es-do.js": 360,
	"./es-us": 361,
	"./es-us.js": 361,
	"./es.js": 359,
	"./et": 362,
	"./et.js": 362,
	"./eu": 363,
	"./eu.js": 363,
	"./fa": 364,
	"./fa.js": 364,
	"./fi": 365,
	"./fi.js": 365,
	"./fo": 366,
	"./fo.js": 366,
	"./fr": 367,
	"./fr-ca": 368,
	"./fr-ca.js": 368,
	"./fr-ch": 369,
	"./fr-ch.js": 369,
	"./fr.js": 367,
	"./fy": 370,
	"./fy.js": 370,
	"./ga": 371,
	"./ga.js": 371,
	"./gd": 372,
	"./gd.js": 372,
	"./gl": 373,
	"./gl.js": 373,
	"./gom-latn": 374,
	"./gom-latn.js": 374,
	"./gu": 375,
	"./gu.js": 375,
	"./he": 376,
	"./he.js": 376,
	"./hi": 377,
	"./hi.js": 377,
	"./hr": 378,
	"./hr.js": 378,
	"./hu": 379,
	"./hu.js": 379,
	"./hy-am": 380,
	"./hy-am.js": 380,
	"./id": 381,
	"./id.js": 381,
	"./is": 382,
	"./is.js": 382,
	"./it": 383,
	"./it-ch": 384,
	"./it-ch.js": 384,
	"./it.js": 383,
	"./ja": 385,
	"./ja.js": 385,
	"./jv": 386,
	"./jv.js": 386,
	"./ka": 387,
	"./ka.js": 387,
	"./kk": 388,
	"./kk.js": 388,
	"./km": 389,
	"./km.js": 389,
	"./kn": 390,
	"./kn.js": 390,
	"./ko": 391,
	"./ko.js": 391,
	"./ku": 392,
	"./ku.js": 392,
	"./ky": 393,
	"./ky.js": 393,
	"./lb": 394,
	"./lb.js": 394,
	"./lo": 395,
	"./lo.js": 395,
	"./lt": 396,
	"./lt.js": 396,
	"./lv": 397,
	"./lv.js": 397,
	"./me": 398,
	"./me.js": 398,
	"./mi": 399,
	"./mi.js": 399,
	"./mk": 400,
	"./mk.js": 400,
	"./ml": 401,
	"./ml.js": 401,
	"./mn": 402,
	"./mn.js": 402,
	"./mr": 403,
	"./mr.js": 403,
	"./ms": 404,
	"./ms-my": 405,
	"./ms-my.js": 405,
	"./ms.js": 404,
	"./mt": 406,
	"./mt.js": 406,
	"./my": 407,
	"./my.js": 407,
	"./nb": 408,
	"./nb.js": 408,
	"./ne": 409,
	"./ne.js": 409,
	"./nl": 410,
	"./nl-be": 411,
	"./nl-be.js": 411,
	"./nl.js": 410,
	"./nn": 412,
	"./nn.js": 412,
	"./pa-in": 413,
	"./pa-in.js": 413,
	"./pl": 414,
	"./pl.js": 414,
	"./pt": 415,
	"./pt-br": 416,
	"./pt-br.js": 416,
	"./pt.js": 415,
	"./ro": 417,
	"./ro.js": 417,
	"./ru": 418,
	"./ru.js": 418,
	"./sd": 419,
	"./sd.js": 419,
	"./se": 420,
	"./se.js": 420,
	"./si": 421,
	"./si.js": 421,
	"./sk": 422,
	"./sk.js": 422,
	"./sl": 423,
	"./sl.js": 423,
	"./sq": 424,
	"./sq.js": 424,
	"./sr": 425,
	"./sr-cyrl": 426,
	"./sr-cyrl.js": 426,
	"./sr.js": 425,
	"./ss": 427,
	"./ss.js": 427,
	"./sv": 428,
	"./sv.js": 428,
	"./sw": 429,
	"./sw.js": 429,
	"./ta": 430,
	"./ta.js": 430,
	"./te": 431,
	"./te.js": 431,
	"./tet": 432,
	"./tet.js": 432,
	"./tg": 433,
	"./tg.js": 433,
	"./th": 434,
	"./th.js": 434,
	"./tl-ph": 435,
	"./tl-ph.js": 435,
	"./tlh": 436,
	"./tlh.js": 436,
	"./tr": 437,
	"./tr.js": 437,
	"./tzl": 438,
	"./tzl.js": 438,
	"./tzm": 439,
	"./tzm-latn": 440,
	"./tzm-latn.js": 440,
	"./tzm.js": 439,
	"./ug-cn": 441,
	"./ug-cn.js": 441,
	"./uk": 442,
	"./uk.js": 442,
	"./ur": 443,
	"./ur.js": 443,
	"./uz": 444,
	"./uz-latn": 445,
	"./uz-latn.js": 445,
	"./uz.js": 444,
	"./vi": 446,
	"./vi.js": 446,
	"./x-pseudo": 447,
	"./x-pseudo.js": 447,
	"./yo": 448,
	"./yo.js": 448,
	"./zh-cn": 449,
	"./zh-cn.js": 449,
	"./zh-hk": 450,
	"./zh-hk.js": 450,
	"./zh-tw": 451,
	"./zh-tw.js": 451
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 610;

/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GroupPipe = /** @class */ (function () {
    function GroupPipe() {
    }
    // GroupPipe
    // Filter group by name
    GroupPipe.prototype.transform = function (groups, search) {
        if (!groups) {
            return;
        }
        else if (!search) {
            return groups;
        }
        else {
            var term_1 = search.toLowerCase();
            return groups.filter(function (group) { return group.name.toLowerCase().indexOf(term_1) > -1; });
        }
    };
    GroupPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
            name: 'groupFilter'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    ], GroupPipe);
    return GroupPipe;
}());

//# sourceMappingURL=group.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Validator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(20);
// Validators
// This file contains all your validators for the formGroups and for inputPrompts.
// Patterns can be tested by using a RegEx validator such as http://www.regexpal.com, https://regex101.com, among others.

var Validator;
(function (Validator) {
    // Set your validators here, don't forget to import and use them in the appropriate class that uses formGroups.
    // In this example, they are used on LoginPage where a formGroup for email and passwords is used.
    Validator.emailValidator = ['', [
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(5),
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')
        ]
    ];
    Validator.passwordValidator = ['', [
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(5),
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9!@#$%^&*()_+-=]*$')
        ]
    ];
    // Set your prompt input validators here, don't forget to import and use them on the AlertController prompt.
    // In this example they are used by home.ts where the user are allowed to change their profile.
    // errorMessages are used by the AlertProvider class and is imported inside AlertProvider.errorMessages which is used by showErrorMessage().
    Validator.profileNameValidator = {
        minLength: 5,
        lengthError: { title: 'Name Too Short!', subTitle: 'Sorry, but name must be more than 4 characters.' },
        pattern: /^[a-zA-Z0-9\s]*$/g,
        patternError: { title: 'Invalid Name!', subTitle: 'Sorry, but the name you entered contains special characters.' }
    };
    Validator.profileEmailValidator = {
        pattern: /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/g,
        patternError: { title: 'Invalid Email Address!', subTitle: 'Sorry, but the email you have entered is invalid.' }
    };
    Validator.profilePasswordValidator = {
        minLength: 5,
        lengthError: { title: 'Password Too Short!', subTitle: 'Sorry, but password must be more than 4 characters.' },
        pattern: /^[a-zA-Z0-9!@#$%^&*()_+-=]*$/g,
        patternError: { title: 'Invalid Password!', subTitle: 'Sorry, but the password you have entered contains special characters.' }
    };
    // Group Form Validators
    Validator.groupNameValidator = ['', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(1)]];
    Validator.groupDescriptionValidator = ['', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(1)]];
})(Validator || (Validator = {}));
//# sourceMappingURL=validator.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_image__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__user_info_user_info__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__image_modal_image_modal__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_keyboard__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_video__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_admob_free__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_social_sharing__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_media_capture__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic_audio__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_lodash__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var MessagePage = /** @class */ (function () {
    // MessagePage
    // This is the page where the user can chat with a friend.
    function MessagePage(navCtrl, navParams, actionSheetCtrl, socialSharing, mediaCapture, file, dataProvider, angularDb, admob, alertProvider, loadingProvider, alertCtrl, imageProvider, modalCtrl, camera, keyboard, videoProvider, _audioProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.socialSharing = socialSharing;
        this.mediaCapture = mediaCapture;
        this.file = file;
        this.dataProvider = dataProvider;
        this.angularDb = angularDb;
        this.admob = admob;
        this.alertProvider = alertProvider;
        this.loadingProvider = loadingProvider;
        this.alertCtrl = alertCtrl;
        this.imageProvider = imageProvider;
        this.modalCtrl = modalCtrl;
        this.camera = camera;
        this.keyboard = keyboard;
        this.videoProvider = videoProvider;
        this._audioProvider = _audioProvider;
        this.startIndex = -1;
        this.scrollDirection = 'bottom';
        // Set number of messages to show.
        this.numberOfMessages = 10;
        // this.myTracks = [{
        //    src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
        //  },
        //  {
        //    src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
        //  }];
    }
    MessagePage_1 = MessagePage;
    MessagePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userId = this.navParams.get('userId');
        this.launchInterstitial();
        // Get friend details.
        this.dataProvider.getUser(this.userId).subscribe(function (user) {
            _this.title = user.name;
            _this.toUserUniqueId = user.uniqueId;
            _this.isOnline = user.isOnline;
        });
        // Get conversationInfo with friend.
        this.angularDb.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid + '/conversations/' + this.userId).subscribe(function (conversation) {
            if (conversation.$exists()) {
                // User already have conversation with this friend, get conversation
                _this.conversationId = conversation.conversationId;
                // Get conversation
                _this.dataProvider.getConversationMessages(_this.conversationId).subscribe(function (messages) {
                    if (_this.messages) {
                        // Just append newly added messages to the bottom of the view.
                        if (messages.length > _this.messages.length) {
                            var message_1 = messages[messages.length - 1];
                            _this.dataProvider.getUser(message_1.sender).subscribe(function (user) {
                                message_1.avatar = user.img;
                                message_1.isOnline = user.isOnline;
                            });
                            _this.messages.push(message_1);
                            // Also append to messagesToShow.
                            _this.messagesToShow.push(message_1);
                            // Reset scrollDirection to bottom.
                            _this.scrollDirection = 'bottom';
                        }
                    }
                    else {
                        // Get all messages, this will be used as reference object for messagesToShow.
                        _this.messages = [];
                        messages.forEach(function (message) {
                            _this.dataProvider.getUser(message.sender).subscribe(function (user) {
                                message.avatar = user.img;
                                message.isOnline = user.isOnline;
                            });
                            _this.messages.push(message);
                        });
                        // Load messages in relation to numOfMessages.
                        if (_this.startIndex == -1) {
                            // Get initial index for numberOfMessages to show.
                            if ((_this.messages.length - _this.numberOfMessages) > 0) {
                                _this.startIndex = _this.messages.length - _this.numberOfMessages;
                            }
                            else {
                                _this.startIndex = 0;
                            }
                        }
                        if (!_this.messagesToShow) {
                            _this.messagesToShow = [];
                        }
                        // Set messagesToShow
                        for (var i = _this.startIndex; i < _this.messages.length; i++) {
                            _this.messagesToShow.push(_this.messages[i]);
                        }
                        _this.loadingProvider.hide();
                    }
                });
            }
        });
        // Update messages' date time elapsed every minute based on Moment.js.
        var that = this;
        if (!that.updateDateTime) {
            that.updateDateTime = setInterval(function () {
                if (that.messages) {
                    that.messages.forEach(function (message) {
                        var date = message.date;
                        message.date = new Date(date);
                    });
                }
            }, 60000);
        }
    };
    MessagePage.prototype.launchInterstitial = function () {
        var interstitialConfig = {
            isTesting: true,
            autoShow: true
            //id: Your Ad Unit ID goes here
        };
        this.admob.interstitial.config(interstitialConfig);
        this.admob.interstitial.prepare().then(function () {
            // success
        });
    };
    // Load previous messages in relation to numberOfMessages.
    MessagePage.prototype.loadPreviousMessages = function () {
        var that = this;
        // Show loading.
        this.loadingProvider.show();
        setTimeout(function () {
            // Set startIndex to load more messages.
            if ((that.startIndex - that.numberOfMessages) > -1) {
                that.startIndex -= that.numberOfMessages;
            }
            else {
                that.startIndex = 0;
            }
            // Refresh our messages list.
            that.messages = null;
            that.messagesToShow = null;
            // Set scroll direction to top.
            that.scrollDirection = 'top';
            // Populate list again.
            that.ionViewDidLoad();
        }, 1000);
    };
    // Update messagesRead when user lefts this page.
    MessagePage.prototype.ionViewWillLeave = function () {
        if (this.messages)
            this.setMessagesRead(this.messages);
    };
    // Check if currentPage is active, then update user's messagesRead.
    MessagePage.prototype.setMessagesRead = function (messages) {
        if (this.navCtrl.getActive().instance instanceof MessagePage_1) {
            // Update user's messagesRead on database.
            var totalMessagesCount;
            this.dataProvider.getConversationMessages(this.conversationId).subscribe(function (messages) {
                totalMessagesCount = messages.length;
            });
            this.angularDb.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid + '/conversations/' + this.userId).update({
                messagesRead: totalMessagesCount
            });
        }
    };
    // Check if 'return' button is pressed and send the message.
    MessagePage.prototype.onType = function (keyCode) {
        if (keyCode == 13) {
            this.keyboard.hide();
            this.send();
        }
    };
    // Scroll to bottom of page after a short delay.
    MessagePage.prototype.scrollBottom = function () {
        var that = this;
        setTimeout(function () {
            that.content.scrollToBottom();
        }, 300);
    };
    // Scroll to top of the page after a short delay.
    MessagePage.prototype.scrollTop = function () {
        var that = this;
        setTimeout(function () {
            that.content.scrollToTop();
        }, 300);
    };
    // Scroll depending on the direction.
    MessagePage.prototype.doScroll = function () {
        if (this.scrollDirection == 'bottom') {
            this.scrollBottom();
        }
        else if (this.scrollDirection == 'top') {
            this.scrollTop();
        }
    };
    // Check if the user is the sender of the message.
    MessagePage.prototype.isSender = function (message) {
        if (message.sender == __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid) {
            return true;
        }
        else {
            return false;
        }
    };
    // Back
    MessagePage.prototype.back = function () {
        this.navCtrl.pop();
    };
    // Send message, if there's no conversation yet, create a new conversation.
    MessagePage.prototype.send = function () {
        var _this = this;
        if (this.message) {
            // User entered a text on messagebox
            if (this.conversationId) {
                // Add Message to the existing conversation
                // Clone an instance of messages object so it will not directly be updated.
                // The messages object should be updated by our observer declared on ionViewDidLoad.
                var messages_1 = JSON.parse(JSON.stringify(this.messages));
                messages_1.push({
                    date: new Date().toString(),
                    sender: __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid,
                    type: 'text',
                    message: this.message,
                    id: new Date().getTime()
                });
                // Update conversation on database.
                this.dataProvider.getConversation(this.conversationId).update({
                    messages: messages_1
                });
                // Clear messagebox.
                this.message = '';
            }
            else {
                // New Conversation with friend.
                var messages = [];
                messages.push({
                    date: new Date().toString(),
                    sender: __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid,
                    type: 'text',
                    message: this.message,
                    id: new Date().getTime()
                });
                var users = [];
                users.push(__WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid);
                users.push(this.userId);
                // Add conversation.
                this.angularDb.list('conversations').push({
                    dateCreated: new Date().toString(),
                    messages: messages,
                    users: users
                }).then(function (success) {
                    var conversationId = success.key;
                    _this.message = '';
                    // Add conversation reference to the users.
                    _this.angularDb.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid + '/conversations/' + _this.userId).update({
                        conversationId: conversationId,
                        messagesRead: 1
                    });
                    _this.angularDb.object('/accounts/' + _this.userId + '/conversations/' + __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid).update({
                        conversationId: conversationId,
                        messagesRead: 0
                    });
                });
            }
        }
    };
    // View user info
    MessagePage.prototype.viewUser = function (userId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__user_info_user_info__["a" /* UserInfoPage */], { userId: userId });
    };
    // Send photoMessage.
    MessagePage.prototype.sendPhoto = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Send Photo Message',
            message: 'Do you want to take a photo or choose from your photo gallery?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Choose from Gallery',
                    handler: function () {
                        // Upload image then return the url.
                        _this.imageProvider.uploadPhotoMessage(_this.conversationId, _this.camera.PictureSourceType.PHOTOLIBRARY).then(function (url) {
                            // Process image message.
                            _this.sendPhotoMessage(url);
                        });
                    }
                },
                {
                    text: 'Take Photo',
                    handler: function () {
                        // Upload image then return the url.
                        _this.imageProvider.uploadPhotoMessage(_this.conversationId, _this.camera.PictureSourceType.CAMERA).then(function (url) {
                            // Process image message.
                            _this.sendPhotoMessage(url);
                        });
                    }
                }
            ]
        }).present();
    };
    // Process photoMessage on database.
    MessagePage.prototype.sendPhotoMessage = function (url) {
        var _this = this;
        if (this.conversationId) {
            // Add image message to existing conversation.
            var messages_2 = JSON.parse(JSON.stringify(this.messages));
            messages_2.push({
                date: new Date().toString(),
                sender: __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid,
                type: 'image',
                url: url,
                id: new Date().getTime()
            });
            // Update conversation on database.
            this.dataProvider.getConversation(this.conversationId).update({
                messages: messages_2
            });
        }
        else {
            // Create new conversation.
            var messages = [];
            messages.push({
                date: new Date().toString(),
                sender: __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid,
                type: 'image',
                url: url,
                id: new Date().getTime()
            });
            var users = [];
            users.push(__WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid);
            users.push(this.userId);
            // Add conversation.
            this.angularDb.list('conversations').push({
                dateCreated: new Date().toString(),
                messages: messages,
                users: users
            }).then(function (success) {
                var conversationId = success.key;
                // Add conversation references to users.
                _this.angularDb.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid + '/conversations/' + _this.userId).update({
                    conversationId: conversationId,
                    messagesRead: 1
                });
                _this.angularDb.object('/accounts/' + _this.userId + '/conversations/' + __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid).update({
                    conversationId: conversationId,
                    messagesRead: 0
                });
            });
        }
    };
    // Enlarge image messages.
    MessagePage.prototype.enlargeImage = function (img) {
        var imageModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__image_modal_image_modal__["a" /* ImageModalPage */], { img: img });
        imageModal.present();
    };
    MessagePage.prototype.videoCall = function () {
        this.videoProvider.MakeCall(this.toUserUniqueId);
    };
    MessagePage.prototype.share = function (message) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Share Message',
            buttons: [
                {
                    text: 'Share',
                    role: 'share',
                    handler: function () {
                        // share message
                        // Check if sharing via email is supported
                        if (message.type == 'text') {
                            _this.socialSharing.share(message.message, "", "", "").then(function () {
                                // Sharing via email is possible
                            }).catch(function () {
                                // Sharing via email is not possible
                            });
                        }
                        else {
                            _this.socialSharing.share(message.message, "Communicater Share", message.url.toString(), message.url).then(function () {
                                // Sharing via email is possible
                            }).catch(function () {
                                // Sharing via email is not possible
                            });
                        }
                    }
                },
                {
                    text: 'Delete',
                    role: 'share',
                    handler: function () {
                        _this.deleteMessage(message);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionSheet.present();
    };
    MessagePage.prototype.audioRec = function () {
        var _this = this;
        var options = { limit: 1 };
        this.mediaCapture.captureAudio(options)
            .then(function (data) {
            _this.updateAudioFile(data[0]);
        }, function (err) {
        });
    };
    MessagePage.prototype.updateAudioFile = function (data) {
        var _this = this;
        var path = data.localURL.substr(0, data.localURL.lastIndexOf('/')) + '/';
        this.file.readAsArrayBuffer(path, data.name)
            .then(function (success) {
            var audioBlob = new Blob([success], {
                type: "audio/amr"
            });
            var metadata = {
                'contentType': 'audio/amr'
            };
            // Generate filename and upload to Firebase Storage.
            __WEBPACK_IMPORTED_MODULE_6_firebase__["storage"]().ref().child('audio/' + _this.userId + _this.generateAudioname()).put(audioBlob, metadata).then(function (snapshot) {
                var url = snapshot.metadata.downloadURLs[0];
                _this.sendAudioMessage(url);
            }, function (error) {
                //alert('err'+error)
            });
        }, function (error) {
        });
    };
    // Process photoMessage on database.
    MessagePage.prototype.sendAudioMessage = function (url) {
        var _this = this;
        if (this.conversationId) {
            // Add image message to existing conversation.
            var messages_3 = JSON.parse(JSON.stringify(this.messages));
            messages_3.push({
                date: new Date().toString(),
                sender: __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid,
                type: 'audio',
                src: url,
                id: new Date().getTime()
            });
            // Update conversation on database.
            this.dataProvider.getConversation(this.conversationId).update({
                messages: messages_3
            });
            this.scrollDirection = 'bottom';
        }
        else {
            // Create new conversation.
            var messages = [];
            messages.push({
                date: new Date().toString(),
                sender: __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid,
                type: 'audio',
                src: url,
                id: new Date().getTime()
            });
            var users = [];
            users.push(__WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid);
            users.push(this.userId);
            // Add conversation.
            this.angularDb.list('conversations').push({
                dateCreated: new Date().toString(),
                messages: messages,
                users: users
            }).then(function (success) {
                var conversationId = success.key;
                // Add conversation references to users.
                _this.angularDb.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid + '/conversations/' + _this.userId).update({
                    conversationId: conversationId,
                    messagesRead: 1
                });
                _this.angularDb.object('/accounts/' + _this.userId + '/conversations/' + __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid).update({
                    conversationId: conversationId,
                    messagesRead: 0
                });
                _this.scrollDirection = 'bottom';
            });
        }
    };
    MessagePage.prototype.playSelectedTrack = function () {
        // use AudioProvider to control selected track
        this._audioProvider.play(this.selectedTrack);
    };
    MessagePage.prototype.pauseSelectedTrack = function () {
        // use AudioProvider to control selected track
        this._audioProvider.pause(this.selectedTrack);
    };
    MessagePage.prototype.onTrackFinished = function (track) {
    };
    // Generate a random filename of length for the image to be uploaded
    MessagePage.prototype.generateAudioname = function () {
        var length = 8;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text + ".amr";
    };
    MessagePage.prototype.deleteMessage = function (data) {
        console.log('message', data);
        if (data.id) {
            var messages = JSON.parse(JSON.stringify(this.messages));
            console.log("messages before", messages);
            __WEBPACK_IMPORTED_MODULE_18_lodash___default.a.remove(messages, function (n) {
                var mes = n;
                return mes.id == data.id;
            });
            console.log("messages after", messages);
            __WEBPACK_IMPORTED_MODULE_18_lodash___default.a.remove(this.messagesToShow, function (n) {
                var mes = n;
                return mes.id == data.id;
            });
            // Update conversation on database.
            this.dataProvider.getConversation(this.conversationId).update({
                messages: messages
            });
        }
        else {
            this.alertProvider.showToast("Something want to wrong please try again.");
            '';
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], MessagePage.prototype, "content", void 0);
    MessagePage = MessagePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-message',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/message/message.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <ion-buttons start>\n     <button ion-button tappable (click)="back()">Back</button>\n   </ion-buttons>\n   <ion-title>{{title}}</ion-title>\n   <ion-buttons end>\n     <button (click)="videoCall()" ion-button icon-only [disabled]="!isOnline">\n       <ion-icon name="videocam"></ion-icon>\n     </button>\n   </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content has-footer>\n  <!-- Messages -->\n\n  <div class="messages">\n    <p class="center" *ngIf="startIndex > 0"><span tappable (click)="loadPreviousMessages()">Load previous messages</span></p>\n    <ion-row *ngFor="let message of messagesToShow">\n      <!--  Message -->\n      <ion-col col-2 class="center" *ngIf="isSender(message)">\n        <img src="{{message.avatar}}" (load)="doScroll()" />\n      </ion-col>\n      <ion-col col-1 *ngIf="!isSender(message)">\n      </ion-col>\n      <ion-col col-9 class="sender" *ngIf="isSender(message)" (press)="share(message)">\n        <div class="left" *ngIf="message.type == \'text\'">\n         <p>\n            {{message.message}}<br/>\n             <span>{{message.date | DateFormat}}</span>\n          </p>\n          \n        </div>\n        <div class="left" *ngIf="message.type == \'image\'">\n         <p>\n          <img tappable (click)="enlargeImage(message.url)" src="{{message.url}}" (load)="doScroll()" />\n          <span>{{message.date | DateFormat}}</span>\n          </p>\n        </div>\n        <div class="left" *ngIf="message.type == \'audio\'">\n         <p>\n          <!--     <button ion-button (click)="play()">\n                Play\n              </button> -->\n             <audio-track #audio  [track]="message" (onFinish)="onTrackFinished($event)">\n              <ion-item>  \n                <ion-thumbnail item-left>\n                  <audio-track-play dark [audioTrack]="audio"><ion-spinner></ion-spinner></audio-track-play>  \n                </ion-thumbnail>\n                <div item-content style="width:100%">\n                  <audio-track-progress-bar dark duration progress [audioTrack]="audio" [ngStyle]="{visibility: audio.completed > 0 ? \'visible\' : \'hidden\'}"></audio-track-progress-bar>\n                </div>\n              </ion-item>    \n            </audio-track>\n             <span>{{message.date | DateFormat}}</span>\n          </p>\n          \n        </div>\n      </ion-col>\n      <ion-col col-9 *ngIf="!isSender(message)" (press)="share(message)">\n        <div class="right" *ngIf="message.type == \'text\'">\n          <p>{{message.message}}<br/>\n          <span>{{message.date | DateFormat}}</span>\n          </p>\n          \n        </div>\n        <div class="left" *ngIf="message.type == \'image\'">\n          <img tappable (click)="enlargeImage(message.url)" src="{{message.url}}" (load)="doScroll()" />\n          <span>{{message.date | DateFormat}}</span>\n        </div>\n         <div class="left" *ngIf="message.type == \'audio\'">\n         <p>\n              <!-- <button ion-button (click)="play()">\n                Play\n              </button> -->\n             <audio-track #audio  [track]="message" (onFinish)="onTrackFinished($event)">\n              <ion-item>  \n                <ion-thumbnail item-left>\n                  <audio-track-play dark [audioTrack]="audio"><ion-spinner></ion-spinner></audio-track-play>  \n                </ion-thumbnail>\n                <div item-content style="width:100%">\n                  <audio-track-progress-bar dark duration progress [audioTrack]="audio" [ngStyle]="{visibility: audio.completed > 0 ? \'visible\' : \'hidden\'}"></audio-track-progress-bar>\n                </div>\n              </ion-item>    \n            </audio-track>\n             <span>{{message.date | DateFormat}}</span>\n          </p>\n          \n        </div>\n      </ion-col>\n      <ion-col col-1 *ngIf="isSender(message)">\n      </ion-col>\n      <ion-col col-2 class="center" *ngIf="!isSender(message)">\n        <ion-icon name="radio-button-on" class="online" [ngClass]="message.isOnline?\'isOnline\' : \'isOffline\'"></ion-icon>\n        <img src="{{message.avatar}}" tappable (click)="viewUser(message.sender)" (load)="doScroll()" />\n      </ion-col>\n    </ion-row>\n  </div>\n</ion-content>\n<!-- Message Box -->\n<ion-footer>\n\n <ion-grid class="bottom_bar">\n      <ion-row>\n        <ion-col>\n            <ion-fab middle left >\n                <ion-buttons style="margin-top:13px">\n                <button mini tappable (click)="sendPhoto()"><ion-icon name="md-camera"></ion-icon></button>\n                </ion-buttons>\n              </ion-fab>\n        </ion-col>\n        <ion-col>\n            <ion-fab middle left >\n                <ion-buttons style="margin-top:13px">\n                <button mini tappable (press)="audioRec()"><ion-icon name="md-mic"></ion-icon></button>\n                </ion-buttons>\n              </ion-fab>\n        </ion-col>\n        <ion-col col-8>\n            <ion-textarea style="color: white" placeholder="Type your message" [(ngModel)]="message" (focus)="scrollBottom()" (keypress)="onType($event.keyCode)"></ion-textarea>\n        </ion-col>\n        <ion-col>\n            <ion-fab middle right style="position: absolute; right: 0 ;">\n                <button ion-fab mini tappable (click)="send()" [disabled]="!message"><ion-icon name="md-send"></ion-icon></button>\n              </ion-fab>\n        </ion-col>\n      </ion-row>\n     \n  </ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/message/message.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_media_capture__["a" /* MediaCapture */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_admob_free__["a" /* AdMobFree */],
            __WEBPACK_IMPORTED_MODULE_9__providers_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_12__providers_video__["a" /* VideoProvider */], __WEBPACK_IMPORTED_MODULE_16_ionic_audio__["a" /* AudioProvider */]])
    ], MessagePage);
    return MessagePage;
    var MessagePage_1;
}());

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_country_code__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UpdateContactPage = /** @class */ (function () {
    function UpdateContactPage(zone, platform, params, loadingProvider, viewCtrl, dataProvider, alertProvider, angularDb, countryCodeProvider) {
        var _this = this;
        this.zone = zone;
        this.platform = platform;
        this.params = params;
        this.loadingProvider = loadingProvider;
        this.viewCtrl = viewCtrl;
        this.dataProvider = dataProvider;
        this.alertProvider = alertProvider;
        this.angularDb = angularDb;
        this.countryCodeProvider = countryCodeProvider;
        this.countryCode = '';
        this.countryList = [];
        this.zone.run(function () {
            _this.dataProvider.getData('userData').then(function (data) {
                _this.user = data;
                if (_this.countryCode != undefined) {
                    _this.phoneNumber = parseInt(data.phoneNumber.replace(_this.countryCode, ''));
                }
                else {
                    _this.phoneNumber = parseInt(data.phoneNumber);
                }
            });
            _this.countryList = _this.countryCodeProvider.getCountryCode();
        });
    }
    UpdateContactPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    UpdateContactPage.prototype.updateContact = function () {
        var _this = this;
        if (this.countryCode != undefined && this.phoneNumber) {
            this.loadingProvider.show();
            var phoneNumber_1 = this.countryCode + this.phoneNumber;
            this.dataProvider.getUserWithPhonenumber(phoneNumber_1).take(1).subscribe(function (userList) {
                _this.loadingProvider.hide();
                if (userList.length > 0) {
                    _this.alertProvider.showErrorMessage('profile/error-same-phoneNumber');
                }
                else {
                    _this.angularDb.object('/accounts/' + _this.user.userId).update({
                        countryCode: _this.countryCode,
                        phoneNumber: phoneNumber_1
                    }).then(function (success) {
                        _this.alertProvider.showPhoneNumberUpdatedMessage();
                        _this.viewCtrl.dismiss();
                    }).catch(function (error) {
                        _this.alertProvider.showErrorMessage('profile/error-update-profile');
                    });
                }
            });
        }
        else if (this.countryCode != undefined) {
            this.alertProvider.showAlert("Failed", "Please choose your country");
        }
        else if (this.phoneNumber != undefined) {
            this.alertProvider.showAlert("Failed", "Please choose your phoneNumber");
        }
    };
    UpdateContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-update-contact',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/update-contact/update-contact.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n<ion-content padding>\n  <ion-grid>\n    <ion-row justify-content-center class="title-container">\n      <p class="page-title">Update Phone number</p>\n    </ion-row>\n    <ion-row  justify-content-center class="contry-code-container">\n      <ion-item>\n        <ion-select placeholder="Select" [(ngModel)]="countryCode" name="code" class="select-country" placeholder="Select Country Code" >\n          <ion-option *ngFor="let item of countryList" value="{{item.dial_code}}">\n              {{item.dial_code}} - {{item.name}}\n          </ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-row>\n    <ion-row  justify-content-center class="mobile-container">\n      <ion-item>\n        <ion-label stacked>Mobile Number</ion-label>\n        <ion-input #mobileinput class="mobile-input" type="number" [(ngModel)]="phoneNumber" name="mobile" maxlength="16"></ion-input>\n      </ion-item>\n    </ion-row>\n     <ion-row justify-content-center class="button-container">\n      <button ion-button round block class="sign-in-button" id="sign-in" (click)="updateContact()">\n        Update\n      </button>\n    </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/update-contact/update-contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_2__providers_country_code__["a" /* CountryCodeProvider */]])
    ], UpdateContactPage);
    return UpdateContactPage;
}());

//# sourceMappingURL=update-contact.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_tabs_tabs__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_verification_verification__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_trial_trial__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(55);
// Login Constants.
// This file contains all your Firebase settings, and app routes.
// It's important to set in your Firebase, Facebook, and Google app credentials here.
// If you have a different view for the homePage, trialPage, and verificationPage
// You can import them here and set them accordingly.
// If you want to disable emailVerification, simply set it to false.




var Login;
(function (Login) {
    // Get your Firebase app's config on your Firebase console. "Add Firebase to your web app".
    Login.firebaseConfig = {
        apiKey: "AIzaSyB-6XBn_KojN2HNk0BSc1imrZysJRLkgX8",
        authDomain: "ionsocial-14887.firebaseapp.com",
        databaseURL: "https://ionsocial-14887.firebaseio.com",
        projectId: "ionsocial-14887",
        storageBucket: "ionsocial-14887.appspot.com",
        messagingSenderId: "521183450177"
    };
    // Get your Facebook App Id from your app at http://developers.facebook.com
    Login.facebookAppId = "814520985371944"; // 1025234637591184
    // TESTing account
    Login.googleClientId = "521183450177-cvjk6anvuvaptpogd6pua2fsjcekoo6p.apps.googleusercontent.com";
    // Set in your appropriate Login routes, don't forget to import the pages on app.module.ts
    Login.homePage = __WEBPACK_IMPORTED_MODULE_0__pages_tabs_tabs__["a" /* TabsPage */];
    Login.verificationPage = __WEBPACK_IMPORTED_MODULE_1__pages_verification_verification__["a" /* VerificationPage */];
    Login.trialPage = __WEBPACK_IMPORTED_MODULE_2__pages_trial_trial__["a" /* TrialPage */];
    Login.loginpage = __WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */];
    // Set whether emailVerification is enabled or not.
    Login.emailVerification = true;
})(Login || (Login = {}));
//# sourceMappingURL=login.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPeoplePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alert__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__user_info_user_info__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SearchPeoplePage = /** @class */ (function () {
    // SearchPeoplePage
    // This is the page where the user can search for other users and send a friend request.
    function SearchPeoplePage(navCtrl, navParams, dataProvider, loadingProvider, alertCtrl, angularDb, alertProvider, firebaseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
        this.alertCtrl = alertCtrl;
        this.angularDb = angularDb;
        this.alertProvider = alertProvider;
        this.firebaseProvider = firebaseProvider;
    }
    SearchPeoplePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Initialize
        this.loadingProvider.show();
        this.searchUser = '';
        // Get all users.
        this.dataProvider.getUsers().subscribe(function (accounts) {
            _this.loadingProvider.hide();
            _this.accounts = accounts;
            _this.dataProvider.getCurrentUser().subscribe(function (account) {
                // Add own userId as exludedIds.
                _this.excludedIds = [];
                _this.account = account;
                if (_this.excludedIds.indexOf(account.$key) == -1) {
                    _this.excludedIds.push(account.$key);
                }
                // Get friends which will be filtered out from the list using searchFilter pipe pipes/search.ts.
                if (account.friends) {
                    account.friends.forEach(function (friend) {
                        if (_this.excludedIds.indexOf(friend) == -1) {
                            _this.excludedIds.push(friend);
                        }
                    });
                }
                // Get requests of the currentUser.
                _this.dataProvider.getRequests(account.$key).subscribe(function (requests) {
                    _this.requestsSent = requests.requestsSent;
                    _this.friendRequests = requests.friendRequests;
                });
            });
        });
    };
    // Back
    SearchPeoplePage.prototype.back = function () {
        this.navCtrl.pop();
    };
    // Get the status of the user in relation to the logged in user.
    SearchPeoplePage.prototype.getStatus = function (user) {
        // Returns:
        // 0 when user can be requested as friend.
        // 1 when a friend request was already sent to this user.
        // 2 when this user has a pending friend request.
        if (this.requestsSent) {
            for (var i = 0; i < this.requestsSent.length; i++) {
                if (this.requestsSent[i] == user.$key) {
                    return 1;
                }
            }
        }
        if (this.friendRequests) {
            for (var i = 0; i < this.friendRequests.length; i++) {
                if (this.friendRequests[i] == user.$key) {
                    return 2;
                }
            }
        }
        return 0;
    };
    // Send friend request.
    SearchPeoplePage.prototype.sendFriendRequest = function (user) {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Send Friend Request',
            message: 'Do you want to send friend request to <b>' + user.name + '</b>?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Send',
                    handler: function () {
                        _this.firebaseProvider.sendFriendRequest(user.$key);
                    }
                }
            ]
        }).present();
    };
    // Cancel friend request sent.
    SearchPeoplePage.prototype.cancelFriendRequest = function (user) {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Friend Request Pending',
            message: 'Do you want to delete your friend request to <b>' + user.name + '</b>?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.firebaseProvider.cancelFriendRequest(user.$key);
                    }
                }
            ]
        }).present();
    };
    // Accept friend request.
    SearchPeoplePage.prototype.acceptFriendRequest = function (user) {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm Friend Request',
            message: 'Do you want to accept <b>' + user.name + '</b> as your friend?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Reject Request',
                    handler: function () {
                        _this.firebaseProvider.deleteFriendRequest(user.$key);
                    }
                },
                {
                    text: 'Accept Request',
                    handler: function () {
                        _this.firebaseProvider.acceptFriendRequest(user.$key);
                    }
                }
            ]
        }).present();
    };
    // View user.
    SearchPeoplePage.prototype.viewUser = function (userId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__user_info_user_info__["a" /* UserInfoPage */], { userId: userId });
    };
    SearchPeoplePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-search-people',template:/*ion-inline-start:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/search-people/search-people.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <ion-buttons>\n      <button ion-button tappable (click)="back()">Back</button>\n    </ion-buttons>\n    <ion-title>Search People</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!-- No other users to send friend request right now. -->\n  <div class="empty-list" *ngIf="accounts && (accounts.length == 0 || (accounts.length == excludedIds.length))">\n    <h1><ion-icon name="md-search"></ion-icon></h1>\n    <p>Uh-oh! Sorry but we can\'t find other users right now. Try again later.</p>\n    <button ion-button icon-left tappable (click)="back()"><ion-icon name="md-arrow-round-back"></ion-icon>Go Back</button>\n  </div>\n  <!-- Show other users excluding yourself, and friends with the help of searchFilter pipe. -->\n  <ion-list class="avatar-list" *ngIf="accounts && accounts.length > 0">\n    <ion-searchbar *ngIf="accounts.length != excludedIds.length" [(ngModel)]="searchUser" placeholder="Search for name or username" showCancelButton="true" cancelButtonText="Done"></ion-searchbar>\n    <ion-item *ngFor="let account of accounts | searchFilter: [excludedIds, searchUser]" no-lines tappable (click)="viewUser(account.$key)">\n      <ion-fab middle right style="position: absolute; right: 0 ;">\n        <!-- Show appropriate buttons depending on the status of this user in relation to the current user. -->\n        <!-- // Returns:\n        // 0 when user can be requested as friend.\n        // 1 when a friend request was already sent to this user.\n        // 2 when this user has a pending friend request. -->\n        <button ion-fab mini tappable (click)="sendFriendRequest(account); $event.stopPropagation();" *ngIf="getStatus(account) == 0">\n          <ion-icon name="md-add-circle" class="success"></ion-icon>\n        </button>\n        <button ion-fab mini tappable (click)="cancelFriendRequest(account); $event.stopPropagation();" *ngIf="getStatus(account) == 1">\n          <ion-icon name="md-close-circle" class="danger"></ion-icon>\n        </button>\n        <button ion-fab mini tappable (click)="acceptFriendRequest(account); $event.stopPropagation();" *ngIf="getStatus(account) == 2">\n          <ion-icon name="md-checkmark-circle" class="success"></ion-icon>\n        </button>\n      </ion-fab>\n      <ion-avatar item-left>\n        <ion-icon name="radio-button-on" class="online" [ngClass]="account.isOnline?\'isOnline\' : \'isOffline\'"></ion-icon>\n        <img src="{{account.img}}">\n      </ion-avatar>\n      <h2>{{account.name}}</h2>\n      <p>@{{account.username}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/testing/Projects/IonicProjects/Projects Clones/Facebook Clone/FacebookCloneV4/src/pages/search-people/search-people.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__providers_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_firebase__["a" /* FirebaseProvider */]])
    ], SearchPeoplePage);
    return SearchPeoplePage;
}());

//# sourceMappingURL=search-people.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the VideoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var VideoProvider = /** @class */ (function () {
    function VideoProvider(platform, alertCtrl, modalCtrl, events, dataProvider, alertProvider, nativeAudio) {
        var _this = this;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.dataProvider = dataProvider;
        this.alertProvider = alertProvider;
        this.nativeAudio = nativeAudio;
        this.platform.ready().then(function () {
            _this.nativeAudio.preloadComplex('uniqueI1', 'assets/tone.mp3', 1, 1, 0).then(function (succ) {
            }, function (err) {
            });
        });
    }
    VideoProvider.prototype.InitializingRTC = function (userData) {
        var _this = this;
        if (this.platform.is('android')) {
            var permissions = cordova.plugins.permissions;
            // permissions.hasPermission(permissions.CAMERA, this.checkVideoPermissionCallback, null);
            // permissions.hasPermission(permissions.RECORD_AUDIO, this.checkAudioPermissionCallback, null);
            // permissions.hasPermission(permissions.BLUETOOTH_ADMIN, this.checkBluetoothPermissionCallback, null);
        }
        //apiRTC initialization
        apiRTC.init({
            apiKey: "819abef1fde1c833e0601ec6dd4a8226",
            apiCCId: userData.uniqueId,
            nickname: userData.name,
            userData: userData,
            onReady: function (e) {
                _this.AddEventListeners();
                _this.sessionReadyHandler(e);
            }
        });
    };
    VideoProvider.prototype.checkVideoPermissionCallback = function (status) {
        var permissions = cordova.plugins.permissions;
        if (!status.hasPermission) {
            var errorCallback = function () {
                alert('Camera permission is not turned on');
            };
            permissions.requestPermission(permissions.CAMERA, function (status) {
                if (!status.hasPermission) {
                    errorCallback();
                }
            }, errorCallback);
        }
    };
    VideoProvider.prototype.checkAudioPermissionCallback = function (status) {
        var permissions = cordova.plugins.permissions;
        if (!status.hasPermission) {
            var errorCallback = function () {
                alert('Audio permission is not turned on');
            };
            permissions.requestPermission(permissions.RECORD_AUDIO, function (status) {
                if (!status.hasPermission) {
                    errorCallback();
                }
            }, errorCallback);
        }
    };
    VideoProvider.prototype.checkBluetoothPermissionCallback = function (status) {
        var permissions = cordova.plugins.permissions;
        if (!status.hasPermission) {
            var errorCallback = function () {
                alert('BLUETOOTH permission is not turned on');
            };
            permissions.requestPermission(permissions.BLUETOOTH_ADMIN, function (status) {
                if (!status.hasPermission) {
                    errorCallback();
                }
            }, errorCallback);
        }
    };
    VideoProvider.prototype.sessionReadyHandler = function (e) {
        this.webRTCClient = apiRTC.session.createWebRTCClient({
            status: "status" //Optionnal
        });
        this.dataProvider.setWebRTCClient(this.webRTCClient);
    };
    VideoProvider.prototype.AddEventListeners = function () {
        var _this = this;
        apiRTC.addEventListener("userMediaSuccess", function (e) {
            _this.events.publish('userMediaSuccess', e);
        });
        apiRTC.addEventListener("userMediaError", function (e) {
            _this.alert.dismiss();
        });
        apiRTC.addEventListener("incomingCall", function (e) {
            _this.events.publish('openVideocall');
            _this.nativeAudio.loop('uniqueI1').then(function (succ) {
            }, function (err) {
            });
            _this.alert = _this.alertCtrl.create({
                title: 'INCOMING CALL ',
                // subTitle: '<img src="assets/calling.gif"><br><p>Call from 96325 ...</p>',
                subTitle: '<img src="assets/call-me.gif"><br><p>Call from ' + e.detail.callerNickname + ' ...</p>',
                cssClass: 'outgoingcall incomingcall',
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'Reject',
                        role: 'cancel',
                        cssClass: 'reject',
                        handler: function () {
                            _this.nativeAudio.stop('uniqueI1');
                            _this.RejectCall(e.detail.callId);
                        }
                    },
                    {
                        text: 'Answer',
                        cssClass: 'answer',
                        handler: function () {
                            _this.nativeAudio.stop('uniqueI1');
                            _this.AnswerCall(e.detail.callId);
                        }
                    }
                ]
            });
            _this.alert.present();
        });
        apiRTC.addEventListener("hangup", function (e) {
            _this.events.publish('hangup', e);
            _this.alertProvider.showToast(e.detail.reason);
            _this.nativeAudio.stop('uniqueI1');
            _this.alert.dismiss();
        });
        apiRTC.addEventListener("remoteStreamAdded", function (e) {
            _this.events.publish('remoteStreamAdded', e);
            _this.alert.dismiss();
        });
        apiRTC.addEventListener("webRTCClientCreated", function (e) {
            _this.webRTCClient.setAllowMultipleCalls(true);
            _this.webRTCClient.setVideoBandwidth(300);
            _this.webRTCClient.setUserAcceptOnIncomingCall(true);
        });
    };
    VideoProvider.prototype.MakeCall = function (calleeId) {
        var _this = this;
        this.events.publish('openVideocall');
        var callId = this.webRTCClient.call(calleeId);
        if (callId != null) {
            //this.incomingCallId = callId;
            this.dataProvider.setIncomingCallId(callId);
            this.alert = this.alertCtrl.create({
                title: "OUTGOING CALL",
                subTitle: '<img src="assets/call-me.gif"><br><p>Call to ' + callId + '</p>',
                buttons: [{
                        text: 'Dismiss',
                        role: 'cancel',
                        handler: function () {
                            _this.RejectCall(callId);
                        }
                    }],
                cssClass: 'outgoingcall ',
                enableBackdropDismiss: false
            });
            this.alert.present();
        }
    };
    VideoProvider.prototype.AnswerCall = function (incomingCallId) {
        this.dataProvider.setIncomingCallId(incomingCallId);
        this.webRTCClient.acceptCall(incomingCallId);
    };
    VideoProvider.prototype._webRTCClinetref = function () {
        return this.webRTCClient;
    };
    VideoProvider.prototype.RejectCall = function (incomingCallId) {
        this.alert.dismiss();
        this.webRTCClient.refuseCall(incomingCallId);
        this.events.publish('rejectCall', incomingCallId);
        // this.RemoveMediaElements(incomingCallId);
    };
    VideoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_5__alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__["a" /* NativeAudio */]])
    ], VideoProvider);
    return VideoProvider;
}());

//# sourceMappingURL=video.js.map

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_async__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_async___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_async__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DataProvider = /** @class */ (function () {
    function DataProvider(angularDb, contacts, storage) {
        this.angularDb = angularDb;
        this.contacts = contacts;
        this.storage = storage;
        this.userContactsList = [];
        this.userOnlyContacts = [];
        this.exitsUserList = [];
        this.inviteUserList = [];
        this.userContactsListWithCountryCode = [];
        this.isContactGet = false;
        this.countryCode = "+1";
    }
    // set webRTCClient
    DataProvider.prototype.setWebRTCClient = function (val) {
        this.webRTCClient = val;
    };
    // get webRTCClient
    DataProvider.prototype.getwebRTCClient = function () {
        return this.webRTCClient;
    };
    // set Incoming Call id
    DataProvider.prototype.setIncomingCallId = function (id) {
        this.incomingCallId = id;
    };
    // get incoming call id
    DataProvider.prototype.getIncomingCallid = function () {
        return this.incomingCallId;
    };
    // Get all users
    DataProvider.prototype.getUsers = function () {
        return this.angularDb.list("/accounts", {
            query: {
                orderByChild: "name"
            }
        });
    };
    // Get user with username
    DataProvider.prototype.getUserWithUsername = function (username) {
        return this.angularDb.list("/accounts", {
            query: {
                orderByChild: "username",
                equalTo: username
            }
        });
    };
    // Get user with phonenumber
    DataProvider.prototype.getUserWithPhonenumber = function (phoneNumber) {
        return this.angularDb.list("/accounts", {
            query: {
                orderByChild: "phoneNumber",
                equalTo: phoneNumber
            }
        });
    };
    // Get logged in user data
    DataProvider.prototype.getCurrentUser = function () {
        return this.angularDb.object("/accounts/" + __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid);
    };
    // Get user by their userId
    DataProvider.prototype.getUser = function (userId) {
        return this.angularDb.object("/accounts/" + userId);
    };
    // Get requests given the userId.
    DataProvider.prototype.getRequests = function (userId) {
        return this.angularDb.object("/requests/" + userId);
    };
    // Get friend requests given the userId.
    DataProvider.prototype.getFriendRequests = function (userId) {
        return this.angularDb.list("/requests", {
            query: {
                orderByChild: "receiver",
                equalTo: userId
            }
        });
    };
    // Get conversation given the conversationId.
    DataProvider.prototype.getConversation = function (conversationId) {
        return this.angularDb.object("/conversations/" + conversationId);
    };
    // Get conversations of the current logged in user.
    DataProvider.prototype.getConversations = function () {
        return this.angularDb.list("/accounts/" + __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid + "/conversations");
    };
    // Get messages of the conversation given the Id.
    DataProvider.prototype.getConversationMessages = function (conversationId) {
        return this.angularDb.object("/conversations/" + conversationId + "/messages");
    };
    // Get messages of the group given the Id.
    DataProvider.prototype.getGroupMessages = function (groupId) {
        return this.angularDb.object("/groups/" + groupId + "/messages");
    };
    // Get groups of the logged in user.
    DataProvider.prototype.getGroups = function () {
        return this.angularDb.list("/accounts/" + __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid + "/groups");
    };
    // Get group info given the groupId.
    DataProvider.prototype.getGroup = function (groupId) {
        return this.angularDb.object("/groups/" + groupId);
    };
    // Get Timeline of user
    DataProvider.prototype.getTimelines = function () {
        return this.angularDb.list("/accounts/" + __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid + "/timeline");
    };
    // Get Timeline by user id
    DataProvider.prototype.getTimelineByUid = function (id) {
        return this.angularDb.object("/accounts/" + id + "/timeline");
    };
    // Get Timeline post
    DataProvider.prototype.getTimelinePost = function () {
        return this.angularDb.list("/timeline");
    };
    DataProvider.prototype.getAllReportedPost = function () {
        return this.angularDb.list("/reportPost");
    };
    // Get time line by id
    DataProvider.prototype.getTimeline = function (timelineId) {
        return this.angularDb.object("/timeline/" + timelineId);
    };
    // Get Friend List
    DataProvider.prototype.getFriends = function () {
        return this.angularDb.list("/accounts/" + __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid + "/friends");
    };
    // Get comments list
    DataProvider.prototype.getComments = function (postId) {
        return this.angularDb.list("/comments/" + postId);
    };
    // Get likes
    DataProvider.prototype.getLike = function (postId) {
        return this.angularDb.list("/likes/" + postId);
    };
    DataProvider.prototype.postLike = function (postId) {
        return this.angularDb.object("/likes/" + postId);
    };
    // Get likes
    DataProvider.prototype.getdisLike = function (postId) {
        return this.angularDb.list("/dislikes/" + postId);
    };
    DataProvider.prototype.postdisLike = function (postId) {
        return this.angularDb.object("/dislikes/" + postId);
    };
    // post Comments
    DataProvider.prototype.postComments = function (postId) {
        return this.angularDb.object("/comments/" + postId);
    };
    // report post to admin
    DataProvider.prototype.getReportPost = function (postId) {
        console.log("postId", postId);
        return this.angularDb.object("/reportPost/" + postId);
    };
    // read contact
    DataProvider.prototype.getContact = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.isContactGet) {
                _this.contacts.find(["*"], {}).then(function (contacts) {
                    _this.userContactsList = [];
                    _this.isContactGet = true;
                    // this.contactlist = data
                    for (var i = 0; i < contacts.length; i++) {
                        if (contacts[i].phoneNumbers) {
                            // for(let j = 0; j < contacts[i].phoneNumbers.length; j++) {
                            if (contacts[i].phoneNumbers[0].value.toString().charAt(0) ==
                                "*" ||
                                contacts[i].phoneNumbers[0].value.toString().charAt(0) == "#") {
                            }
                            else {
                                var user = {
                                    name: _this.getNameFromContact(contacts[i], contacts[i].phoneNumbers[0].value.toString()),
                                    phoneNumber: contacts[i].phoneNumbers[0].value.toString()
                                };
                                _this.userOnlyContacts.push(contacts[i].phoneNumbers[0].value.toString());
                                _this.userContactsList.push(user);
                            }
                            // }
                        }
                    }
                    resolve(_this.userOnlyContacts);
                    _this.isContactGet = false;
                }, function (err) {
                    reject(false);
                });
            }
            else {
                resolve(_this.userContactsList);
            }
        });
    };
    DataProvider.prototype.getNameFromContact = function (contact, number) {
        if (contact.name) {
            if (contact.name.formatted) {
                return contact.name.formatted;
            }
            else {
                return number;
            }
        }
        else {
            return number;
        }
    };
    DataProvider.prototype.setContactWithCountryCode = function (countryCode) {
        var _this = this;
        this.countryCode = countryCode;
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_5_async___default.a.map(_this.userContactsList, function (item, CB) {
                _this.checkContact(item, CB);
            }, function (err, results) {
                // results is now an array of stats for each file
                if (err) {
                    reject(false);
                }
                else {
                    var contact = results;
                    resolve(contact);
                }
            });
        });
    };
    DataProvider.prototype.checkContact = function (item, callback) {
        var temp = item.phoneNumber.trim();
        temp = temp.split(")").join("");
        temp = temp.split("(").join("");
        temp = temp.split(" ").join("");
        temp = temp.replace(/\s/g, "");
        temp = temp.split("-").join("");
        if (temp.charAt(0) == "+") {
        }
        else if (temp.charAt(0) == "0" && temp.charAt(1) == "0") {
            var _tempConatct = "+" + temp.substr(2);
            item["phoneNumber"] = _tempConatct;
        }
        else if (temp.charAt(0) == "0") {
            var _tempConatct = this.countryCode + temp.substr(1);
            item["phoneNumber"] = _tempConatct;
        }
        else {
            var numberWithCountryCode = this.countryCode + temp;
            item["phoneNumber"] = numberWithCountryCode;
        }
        this.getUserWithPhonenumber(item.phoneNumber).subscribe(function (data) {
            if (data.length > 0) {
                item["isUser"] = "1";
            }
            else {
                item["isUser"] = "0";
            }
        });
        callback(null, item);
    };
    // setContactWithCountryCode(countryCode) {
    //   // this.userContactsListWithCountryCode = [];
    //   return new Promise((resolve, reject) => {
    //     for (let i = 0; i < this.userContactsList.length; i++) {
    //       let temp = this.userContactsList[i].phoneNumber;
    //       temp = temp.split(")").join("");
    //       temp = temp.split("(").join("");
    //       temp = temp.split(" ").join("");
    //       temp = temp.replace(/\s/g, "");
    //       temp = temp.split("-").join("");
    //       if (temp.charAt(0) == "+") {
    //       } else if (temp.charAt(0) == "0" && temp.charAt(1) == "0") {
    //         let _tempConatct = "+" + temp.substr(2);
    //         this.userContactsList[i].phoneNumber = _tempConatct;
    //       } else if (temp.charAt(0) == "0") {
    //         let _tempConatct = countryCode + temp.substr(1);
    //         this.userContactsList[i].phoneNumber = _tempConatct;
    //       } else {
    //         let numberWithCountryCode = countryCode + temp;
    //         this.userContactsList[i].phoneNumber = numberWithCountryCode;
    //       }
    //     }
    //     resolve(this.userContactsList);
    //     this.checkUserExitsOrNot(this.userContactsList);
    //
    //   });
    // }
    DataProvider.prototype.setData = function (key, val) {
        this.storage.set(key, val);
    };
    DataProvider.prototype.getData = function (key) {
        return this.storage.get(key).then(function (val) {
            return val;
        });
    };
    DataProvider.prototype.clearData = function () {
        this.storage.clear();
    };
    DataProvider.prototype.checkUserExitsOrNot = function (userContactsList) {
        var _this = this;
        this.exitsUserList = [];
        this.inviteUserList = [];
        userContactsList.forEach(function (contacts) {
            _this.getUserWithPhonenumber(contacts.phoneNumber).subscribe(function (data) {
                if (data.length > 0) {
                    _this.exitsUserList.push(userContactsList);
                }
                else {
                    _this.inviteUserList.push(userContactsList);
                }
            });
        });
    };
    DataProvider.prototype.removePost = function (post) {
        var _this = this;
        this.getUser(post.postBy).take(1).subscribe(function (account) {
            console.log("before timeline", timeline);
            var timeline = account.timeline;
            __WEBPACK_IMPORTED_MODULE_6_lodash___default.a.remove(timeline, function (n) {
                return n == post.$key;
            });
            console.log("after timeline", timeline);
            // Add both users as friends.
            _this.getUser(post.postBy).update({
                timeline: timeline
            }).then(function (success) {
                /**
                 * Remove post from time line
                //  */
                _this.getTimeline(post.$key).remove().then(function (success) {
                    _this.angularDb.object('/reportPost/' + post.$key).remove();
                }).catch(function (error) {
                });
            });
        });
    };
    DataProvider.prototype.ignorePost = function (post) {
        console.log("ingnore post ", post);
        this.angularDb.object('/reportPost/' + post.$key).remove();
    };
    DataProvider.prototype.unFriend = function (userId) {
        var _this = this;
        /**
         * Remove friend id from friend account
         */
        this.getUser(userId).take(1).subscribe(function (account) {
            var friends = account.friends;
            console.log("==friend List before", friends);
            if (friends) {
                __WEBPACK_IMPORTED_MODULE_6_lodash___default.a.remove(friends, function (n) {
                    return n == __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid;
                });
                _this.getUser(userId).update({
                    friends: friends
                }).then(function (success) {
                });
            }
            console.log("==friend List after", friends);
        });
        /**
         * Remove friend id from login user account
         */
        this.getUser(__WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid).take(1).subscribe(function (account) {
            var friends = account.friends;
            console.log("==user List before", friends);
            if (friends) {
                __WEBPACK_IMPORTED_MODULE_6_lodash___default.a.remove(friends, function (n) {
                    return n == userId;
                });
                _this.getUser(__WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid).update({
                    friends: friends
                }).then(function (success) {
                });
            }
            console.log("==user List after", friends);
        });
    };
    DataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["a" /* Contacts */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], DataProvider);
    return DataProvider;
}());

//# sourceMappingURL=data.js.map

/***/ })

},[452]);
//# sourceMappingURL=main.js.map