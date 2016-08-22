(function() {
    window.fnSkey = function() {
        var oSkey = document.getElementById("skey");
        var aPhoto = getByClass(oSkey, "photoShow");
        var aPage = getByClass(oSkey, "pageNum")[0];
        var aOneli = aPhoto[0].getElementsByTagName("li");
        var aBtn = aPage.getElementsByTagName("li");
        var timer = null;
        var aPos = [];
        for (var i = 0; i < aOneli.length; i++) {
            aPos[i] = {
                l: aOneli[i].offsetLeft,
                t: aOneli[i].offsetTop
            }
        }
        for (var j = 0; j < aPhoto.length; j++) {
            var aLi = aPhoto[j].getElementsByTagName("li");
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].style.left = aPos[i].l + "px";
                aLi[i].style.top = aPos[i].t + "px"
            }
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].style.position = "absolute";
                aLi[i].style.margin = "0"
            }
        }
        for (var i = 0; i < aBtn.length; i++) {
            aBtn[i].bM = false; (function(index1) {
                addEvent(aBtn[i], "click", 
                function() {
                    if (aBtn[index1].bM == true) {
                        return
                    }
                    aBtn[index1].bM = true;
                    if (aBtn[index1] != index1) {
                        clearInterval(aBtn[index1].timer)
                    }
                    for (var i = 0; i < aBtn.length; i++) {
                        aBtn[i].className = "";
                        aPhoto[i].style.display = "none"
                    }
                    this.className = "on";
                    aPhoto[index1].style.display = "block";
                    var aLi = aPhoto[index1].getElementsByTagName("li");
                    var j = 0;
                    aBtn[index1].timer = setInterval(function() { (function(index) {
                            move(aLi[index], {
                                left: 300,
                                top: 200,
                                width: 20,
                                height: 20,
                                opacity: 0
                            },
                            {
                                duration: 200,
                                complete: function() {
                                    if (index == aLi.length - 1) {
                                        var j = aLi.length - 1;
                                        aBtn[index1].timer = setInterval(function() {
                                            move(aLi[j], {
                                                left: aPos[j].l,
                                                top: aPos[j].t,
                                                width: 278,
                                                height: 204,
                                                opacity: 1
                                            },
                                            {
                                                duration: 200
                                            });
                                            j--;
                                            if (j == -1) {
                                                clearInterval(aBtn[index1].timer);
                                                aBtn[index1].bM = false
                                            }
                                        },
                                        100)
                                    }
                                }
                            })
                        })(j);
                        j++;
                        if (j == aLi.length) {
                            clearInterval(aBtn[index1].timer)
                        }
                    },
                    100)
                })
            })(i)
        }
    }
})(); (function() {
    window.sixCirl = function() {
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        var oBox = document.getElementById("pink");
        var aLi = getByClass(oBox, "boxes");
        var aScril = getByClass(oBox, "myCl");
        var pL = getByClass(oBox, "crils")[0];
        var aSpan = oBox.getElementsByTagName("span");
        var R = aScril[0].offsetWidth;
        for (var i = 0; i < aScril.length; i++) { (function(index) {
                aScril[i].onmouseover = function(ev) {
                    var T = getPos(aLi[index]).top;
                    var top = T - scrollT;
                    var left = getPos(aLi[index]).left;
                    var oEvent = ev || event;
                    var disX = oEvent.clientX - left;
                    var disY = oEvent.clientY - top;
                    var X = 2 * disX - R;
                    var Y = 2 * disY - R;
                    aSpan[index].style.left = X + "px";
                    aSpan[index].style.top = Y + "px";
                    move(aSpan[index], {
                        left: 0,
                        top: 0
                    })
                };
                aScril[i].onmouseout = function(ev) {
                    var T = getPos(aLi[index]).top;
                    var top = T - scrollT;
                    var left = getPos(aLi[index]).left;
                    var oEvent = ev || event;
                    var disX = oEvent.clientX - left;
                    var disY = oEvent.clientY - top;
                    var X = 2 * disX - R;
                    var Y = 2 * disY - R;
                    move(aSpan[index], {
                        left: X,
                        top: Y
                    })
                }
            })(i)
        }
    }
})(); (function() {
    window.dragLy = function() {
        var oBox = document.getElementById("red");
        var oShortUl = getByClass(oBox, "shortMsg")[0];
        var oLongUl = getByClass(oBox, "longMsg")[0];
        var oLy = getByClass(oBox, "lY")[0];
        var aLi = oBox.getElementsByTagName("li");
        var aPos = [];
        var aWid = [];
        var zIndex = 1;
        for (var i = aLi.length - 1; i >= 0; i--) {
            aPos[i] = {
                left: aLi[i].offsetLeft,
                top: aLi[i].offsetTop
            };
            aWid[i] = {
                w: aLi[i].offsetWidth,
                inner: aLi[i].innerHTML
            };
            aLi[i].style.left = aPos[i].left + "px";
            aLi[i].style.top = aPos[i].top + "px";
            aLi[i].style.position = "absolute";
            aLi[i].style.margin = "0";
            aLi[i].index = i;
            drag(aLi[i])
        }
        function drag(obj) {
            obj.onmousedown = function(ev) {
                var oEvent = ev || event;
                var disX = oEvent.clientX - obj.offsetLeft;
                var disY = oEvent.clientY - obj.offsetTop;
                clearInterval(obj.timer);
                obj.style.zIndex = zIndex++;
                document.onmousemove = function(ev) {
                    var oEvent = ev || event;
                    obj.style.left = oEvent.clientX - disX + "px";
                    obj.style.top = oEvent.clientY - disY + "px"
                };
                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    obj.releaseCapture && obj.releaseCapture();
                    var oNear = findMin(obj);
                    if (oNear) {
                        var tmp = obj.index;
                        obj.index = oNear.index;
                        oNear.index = tmp;
                        move(oNear, aPos[oNear.index]);
                        oNear.style.width = aWid[oNear.index].w + "px";
                        obj.style.width = aWid[obj.index].w + "px"
                    }
                    move(obj, aPos[obj.index])
                }
            };
            obj.setCapture && obj.setCapture();
            return false
        }
        function collTest(obj1, obj2) {
            var l1 = obj1.offsetLeft;
            var t1 = obj1.offsetTop;
            var r1 = l1 + obj1.offsetWidth;
            var b1 = t1 + obj1.offsetHeight;
            var l2 = obj2.offsetLeft;
            var t2 = obj2.offsetTop;
            var r2 = l2 + obj2.offsetWidth;
            var b2 = t2 + obj2.offsetHeight;
            if (r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2) {
                return false
            } else {
                return true
            }
        }
        function getDis(obj1, obj2) {
            var a = obj1.offsetLeft - obj2.offsetLeft;
            var b = obj1.offsetTop - obj2.offsetTop;
            return Math.sqrt(a * a + b * b)
        }
        function findMin(obj) {
            var iMin = 999999999;
            var iMinIndex = -1;
            for (var i = 0; i < aLi.length; i++) {
                if (obj == aLi[i]) {
                    continue
                }
                if (collTest(obj, aLi[i])) {
                    var dis = getDis(obj, aLi[i]);
                    if (iMin > dis) {
                        iMin = dis;
                        iMinIndex = i
                    }
                }
            }
            return aLi[iMinIndex]
        }
    }
})(); (function() {
    window.dragBox = function() {
        var oBox = document.getElementById("blue");
        var aDiv = oBox.getElementsByTagName("span");
        var oDymic = getByClass(oBox, "laBox")[0];
        for (var i = 0; i < aDiv.length; i++) {
            drag(aDiv[i])
        }
        function drag(obj) {
            obj.onmousedown = function(ev) {
                var oEvent = ev || event;
                var oldX = oEvent.clientX;
                var oldW = oDymic.offsetWidth;
                var oldLeft = oDymic.offsetLeft;
                var oldY = oEvent.clientY;
                var oldH = oDymic.offsetHeight;
                var oldTop = oDymic.offsetTop;
                document.onmousemove = function(ev) {
                    var oEvent = ev || event;
                    if (obj.className.indexOf("l") != -1) {
                        var disX = oEvent.clientX - oldX;
                        var l = oldLeft + disX;
                        oDymic.style.left = l + "px";
                        oDymic.style.marginLeft = -2 + "px";
                        oDymic.style.width = oldW - disX + "px";
                        if (l >= oldW + oldLeft - obj.offsetWidth) {
                            oDymic.style.left = oldW + oldLeft - obj.offsetWidth+ "px";
                            oDymic.style.width = obj.offsetWidth + "px"
                        } 
                    }
                    if (obj.className.indexOf("t") != -1) {
                        var disY = oEvent.clientY - oldY;
                        var t = oldTop + disY;
                        oDymic.style.height = oldH - disY + "px";
                        oDymic.style.top = t + "px";
                        oDymic.style.marginTop = -2 + "px";
                        if (t >= oldH + oldTop - obj.offsetHeight) {
                            oDymic.style.top = oldH + oldTop - obj.offsetHeight + "px";
                            oDymic.style.height = obj.offsetHeight + "px"
                        }
                    }
                    if (obj.className.indexOf("r") != -1) {
                        var disX = oEvent.clientX - oldX;
                        var r = oldW + disX;
                        oDymic.style.width = r + "px";
                        if (r <= obj.offsetWidth) {
                            oDymic.style.width = obj.offsetWidth + "px"
                        }
                    }
                    if (obj.className.indexOf("b") != -1) {
                        var disY = oEvent.clientY - oldY;
                        var b = oldH + disY;
                        oDymic.style.height = b + "px";
                        if (b <= obj.offsetHeight) {
                            oDymic.style.height = obj.offsetHeight + "px"
                        }
                    }
                };
                document.onmouseup = function(ev) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    obj.releaseCapture && obj.releaseCapture()
                };
                obj.setCapture && obj.setCapture();
                return false
            }
        }
    }
})(); (function() {
    window.fnSlide = function() {
        var oBox = document.getElementById("black");
        var aBigDiv = getByClass(oBox, "bigPic")[0];
        var aBigLi = aBigDiv.getElementsByTagName("li");
        var oBtnPrev = getByClass(oBox, "pre")[0];
        var oBtnNext = getByClass(oBox, "next")[0];
        var aSmDiv = getByClass(oBox, "transparent")[0];
        var aBtn = aSmDiv.getElementsByTagName("li");
        var oDiv = getByClass(oBox, "slideBimg")[0];
        aBigDiv.innerHTML += aBigDiv.innerHTML;
        aBigDiv.style.width = aBigLi[0].offsetWidth * aBigLi.length + "px";
        var timer = null;
        var len = aBtn.length;
        var iNow = 0;
        var w = aBigDiv.offsetWidth / 2;
        oDiv.onmouseover = function() {
            clearInterval(timer)
        };
        oDiv.onmouseout = function() {
            timer = setInterval(next, 1000)
        };
        timer = setInterval(next, 1000);
        oBtnPrev.onclick = function next() {
            iNow--;
            tab()
        };
        oBtnNext.onclick = next;
        function next() {
            iNow++;
            tab()
        }
        for (var i = 0; i < len; i++) { (function(index) {
                aBtn[i].onclick = function() {
                    if (aBtn[0].className == "on" && index == len - 1) {
                        iNow--
                    } else {
                        if (aBtn[len - 1].className == "on" && index == 0) {
                            iNow++
                        } else {
                            iNow = Math.floor(iNow / len) * len + index
                        }
                    }
                    tab()
                }
            })(i)
        }
        function tab() {
            for (var i = 0; i < len; i++) {
                aBtn[i].className = ""
            }
            if (iNow > 0) {
                aBtn[iNow % len].className = "on"
            } else {
                aBtn[(iNow % len + len) % len].className = "on"
            }
            move(aBigDiv, -iNow * aBigLi[0].offsetWidth)
        }
        var left = 0;
        function move(obj, iTarget) {
            var start = left;
            var dis = iTarget - start;
            var time = 1000;
            var count = Math.round(time / 30);
            var n = 0;
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                n++;
                var a = 1 - n / count;
                var cur = start + dis * (1 - a * a * a);
                left = cur;
                if (left < 0) {
                    obj.style.left = left % w + "px"
                } else {
                    obj.style.left = (left % w - w) % w + "px"
                }
                if (n == count) {
                    clearInterval(obj.timer)
                }
            },
            30)
        }
    }
})(); (function() {
    window.textShodow = function() {
        var oBox = document.getElementById("green");
        var oDiv = getByClass(oBox, "text")[0];
        var oBtn = oBox.getElementsByTagName("input")[0];
        var timer = null;
        var str = "《写词~作曲~能弹~能唱~能演~如今对歌手要求越来越高了~~如果一个歌手说~写词是作词家的事~作曲是编曲家的事~能弹的是弹奏家~能演的是演员~我只是歌手~会唱歌就行了~又不是作词家 编曲家 弹奏家 更没想过当演员~把歌唱好就OK了~~我想大众也就对他呵呵一笑~然后他便淹没在茫茫人海之中~歌手的名声都不会有~~作为前端工程师的我~不认可~设计稿是设计的事~页面是前端的事~数据是后端的事~整个产品是产品经理的事~其实都是自己的事~做好自己的事~也就是做好整个产品线的事~除非想被淹没~便无所事事~";
        oBtn.onclick = function() {
            clearInterval(timer);
            oDiv.innerHTML = "";
            for (var i = 0; i < str.length; i++) {
                var oSpan = document.createElement("span");
                oSpan.innerHTML = str.charAt(i);
                oDiv.appendChild(oSpan)
            }
            var aSpan = oDiv.children;
            var i = 0;
            timer = setInterval(function() {
                aSpan[i].className = "on";
                i++;
                if (i == aSpan.length) {
                    clearInterval(timer)
                }
            },
            30)
        }
    }
})(); (function() {
    window.fnshake = function() {
        var oBox = document.getElementById("green");
        var oDiv = getByClass(oBox, "collection")[0];
        var aLi = oDiv.getElementsByTagName("li");
        var aPos = [];
        for (var i = 0; i < aLi.length; i++) {
            aPos[i] = {
                left: aLi[i].offsetLeft,
                top: aLi[i].offsetTop
            };
            aLi[i].style.left = aPos[i].left + "px";
            aLi[i].style.top = aPos[i].top + "px"
        }
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].style.position = "absolute";
            aLi[i].style.margin = 0
        }
        var timer = null;
        for (var i = 0; i < aLi.length; i++) { (function(index) {
                aLi[i].onmouseover = function() {
                    clearInterval(timer);
                    timer = setInterval(function() {
                        move(aLi[index], {
                            left: aPos[index].left + 6,
                            top: aPos[index].top + 6
                        },
                        {
                            duration: 80,
                            complete: function() {
                                move(aLi[index], {
                                    left: aPos[index].left,
                                    top: aPos[index].top
                                },
                                {
                                    duration: 80
                                })
                            }
                        })
                    },
                    160);
                    setTimeout(function() {
                        clearInterval(timer)
                    },
                    480)
                };
                aLi[i].onmouseout = function() {
                    clearInterval(timer)
                }
            })(i)
        }
    }
})(); (function() {
    window.fnMynav = function() {
        var oNav = document.getElementById("nav");
        var oMove = getByClass(oNav, "movediv")[0];
        var aLi = oNav.getElementsByTagName("li");
        for (var i = 0; i < aLi.length; i++) { (function(index) {
                aLi[i].onmouseover = function() {
                    startMove(oMove, "left", aLi[index].offsetLeft)
                };
                aLi[index].onclick = function() {
                    if (aLi[index] == aLi[0]) {
                        moveScrollTop(0, 500)
                    }
                    if (aLi[index] == aLi[1]) {
                        moveScrollTop(940, 500)
                    }
                    if (aLi[index] == aLi[2]) {
                        moveScrollTop(1884, 500)
                    }
                    if (aLi[index] == aLi[3]) {
                        moveScrollTop(2684, 500)
                    }
                    if (aLi[index] == aLi[4]) {
                        moveScrollTop(3484, 500)
                    }
                    if (aLi[index] == aLi[5]) {
                        moveScrollTop(4284, 500)
                    } else {
                        if (aLi[index] == aLi[6]) {
                            moveScrollTop(5084, 500)
                        }
                    }
                }
            })(i)
        }
    }
})(); (function() {
    window.myChrom = function() {
        var oBox = document.getElementById("myChrom");
        var aLi = oBox.getElementsByTagName("li");
        var aPos = [];
        var zindex = 1;
        for (var i = 0; i < aLi.length; i++) {
            aPos[i] = {
                left: aLi[i].offsetLeft,
                top: aLi[i].offsetTop
            };
            aLi[i].style.left = aPos[i].left + "px";
            aLi[i].style.top = aPos[i].top + "px"
        }
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].style.position = "absolute";
            aLi[i].style.margin = 0
        }
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
            drag(aLi[i])
        }
        function drag(obj) {
            obj.onmousedown = function(ev) {
                var oEvent = ev || event;
                var disX = oEvent.clientX - obj.offsetLeft;
                var disY = oEvent.clientY - obj.offsetTop;
                obj.style.zIndex = zindex++;
                document.onmousemove = function(ev) {
                    var oEvent = ev || event;
                    var l = oEvent.clientX - disX;
                    var t = oEvent.clientY - disY;
                    obj.style.left = l + "px";
                    obj.style.top = t + "px";
                    var oNear = findNearst(obj);
                    if (oNear && obj != oNear) {
                        var n = obj.index;
                        var m = oNear.index;
                        if (n < m) {
                            for (var i = 0; i < aLi.length; i++) {
                                if (aLi[i].index >= n + 1 && aLi[i].index <= m) {
                                    aLi[i].index--;
                                    move(aLi[i], aPos[aLi[i].index])
                                }
                            }
                            obj.index = m
                        } else {
                            for (var i = 0; i < aLi.length; i++) {
                                if (aLi[i].index >= m && aLi[i].index <= n - 1) {
                                    aLi[i].index++;
                                    move(aLi[i], aPos[aLi[i].index], {
                                        duration: 200
                                    })
                                }
                            }
                            obj.index = m
                        }
                    }
                };
                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    obj.releaseCapture && obj.releaseCapture();
                    move(obj, aPos[obj.index], {
                        duration: 200
                    })
                };
                obj.setCapture && obj.setCapture();
                return false
            }
        }
        function collTest(obj1, obj2) {
            var l1 = obj1.offsetLeft;
            var r1 = l1 + obj1.offsetWidth;
            var t1 = obj1.offsetTop;
            var b1 = t1 + obj1.offsetHeight;
            var l2 = aPos[obj2.index].left;
            var r2 = l2 + obj2.offsetWidth;
            var t2 = aPos[obj2.index].top;
            var b2 = t2 + obj2.offsetHeight;
            if (r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2) {
                return false
            } else {
                return true
            }
        }
        function getDis(obj1, obj2) {
            var a = obj1.offsetLeft - aPos[obj2.index].left;
            var b = obj2.offsetTop - aPos[obj2.index].top;
            return Math.sqrt(a * a + b * b)
        }
        function findNearst(obj) {
            var iMaxNumber = new Date().getTime();
            var iMinIndex = -1;
            for (var i = 0; i < aLi.length; i++) {
                if (collTest(obj, aLi[i])) {
                    var dis = getDis(obj, aLi[i]);
                    if (dis < iMaxNumber) {
                        iMaxNumber = dis;
                        iMinIndex = i
                    }
                }
            }
            if (iMinIndex == -1) {
                return null
            }
            return aLi[iMinIndex]
        }
    }
})(); (function() {
    window.fnMySfq = function() {
        var oBox = document.getElementById("mySfq"),
        aDiv = oBox.getElementsByTagName("div"),
        aSpan = oBox.getElementsByTagName("span");
        for (var i = 1; i < aSpan.length; i++) {
            aDiv[i].style.left = aDiv[0].offsetWidth + 20 * (i - 1) + "px"
        }
        for (var i = 0; i < aDiv.length; i++) { (function(index) {
                aSpan[i].onmouseover = function() {
                    for (var i = 1; i < aDiv.length + 1; i++) {
                        if (i <= index) {
                            move(aDiv[i], {
                                left: 20 * i
                            })
                        } else {
                            move(aDiv[i], {
                                left: aDiv[0].offsetWidth + 20 * (i - 1)
                            })
                        }
                    }
                }
            })(i)
        }
    }
})(); (function() {
    window.myPicLoad = function() {
        var loadPic = ["images/home_about.png", "images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpg", "images/6.jpg", "images/home_contact.png", "images/home_fb.png", "images/home_work.png"];
        var oBar = document.getElementById("bar"),
        oBar_box = oBar.children[0],
        oP = oBar.children[1],
        oShade = document.getElementById("shade"),
        oWarp = document.getElementById("wraper");
        var count = 0,
        iNow = 3,
        imgleng = loadPic.length;
        for (var i = 0; i < imgleng; i++) {
            var oImg = new Image();
            oImg.onload = function() {
                count++;
                oBar_box.style.width = 100 * count / imgleng + "%";
                oP.innerHTML = "已加载" + parseInt(100 * count / imgleng) + "%";
                if (count == imgleng) {
                    oP.innerHTML = iNow + "秒后进入网站...";
                    var timer = setInterval(function() {
                        iNow--;
                        oP.innerHTML = iNow + "秒后进入网站...";
                        if (iNow == 0) {
                            clearInterval(timer);
                            oBar.style.display = "none";
                            oShade.style.display = "none";
                            document.body.style.overflowY = ""
                        }
                    },
                    1000)
                }
            };
            oImg.src = loadPic[i]
        }
    }
})(); (function() {
    window.myGame = function() {
        var oYelow = document.getElementById("yellow");
        var aBtn = oYelow.getElementsByTagName("input")[0];
        var oBox = getByClass(oYelow, "bigGrid")[0];
        var aDigital = [];
        aBtn.onclick = function() {
            newGame()
        };
        newGame();
        function newGame() {
            init();
            generateOneNumber();
            generateOneNumber()
        }
        function init() {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    var oDiv = document.getElementById("grid-" + i + "-" + j);
                    oDiv.style.left = getPosL(i, j) + "px";
                    oDiv.style.top = getPosT(i, j) + "px"
                }
            }
            for (var i = 0; i < 4; i++) {
                aDigital[i] = [];
                for (var j = 0; j < 4; j++) {
                    aDigital[i][j] = 0
                }
            }
            updateaDigView()
        }
        function updateaDigView() {
            var aNum = getByClass(oYelow, "showNum");
            for (var i = 0; i < aNum.length; i++) {
                oBox.removeChild(aNum[i])
            }
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    var oshow = document.createElement("div");
                    oshow.className = "showNum";
                    oshow.id = "num-" + i + "-" + j;
                    oBox.appendChild(oshow);
                    var oNum = document.getElementById("num-" + i + "-" + j);
                    if (aDigital[i][j] == 0) {
                        oNum.style.width = 0;
                        oNum.style.height = 0;
                        oNum.style.position = "absolute";
                        oNum.style.left = getPosL(i, j) + 50 + "px";
                        oNum.style.top = getPosT(i, j) + 50 + "px"
                    } else {
                        oNum.style.width = 100 + "px";
                        oNum.style.position = "absolute";
                        oNum.style.height = 100 + "px";
                        oNum.style.left = getPosL(i, j) + "px";
                        oNum.style.top = getPosT(i, j) + "px";
                        oNum.style.backgroundColor = getaDigBg(aDigital[i][j]);
                        oNum.style.color = getaDigCol(aDigital[i][j]);
                        oNum.innerHTML = aDigital[i][j]
                    }
                }
            }
        }
        function generateOneNumber() {
            if (nospace(aDigital)) {
                return false
            }
            var randx = parseInt(Math.floor(Math.random() * 4));
            var randy = parseInt(Math.floor(Math.random() * 4));
            while (true) {
                if (aDigital[randx][randy] == 0) {
                    break
                }
                randx = parseInt(Math.floor(Math.random() * 4));
                randy = parseInt(Math.floor(Math.random() * 4))
            }
            var randNumber = Math.random() < 0.5 ? 2: 4;
            aDigital[randx][randy] = randNumber;
            showNumberWithAnimation(randx, randy, randNumber);
            return true
        }
        function showNumberWithAnimation(i, j, randNumber) {
            var numberCell = document.getElementById("num-" + i + "-" + j);
            numberCell.style.backgroundColor = getaDigBg(randNumber);
            numberCell.style.color = getaDigCol(randNumber);
            numberCell.innerHTML = randNumber;
            move(numberCell, {
                width: "100",
                height: "100",
                top: getPosT(i, j),
                left: getPosL(i, j)
            },
            {
                duration: 50
            })
        }
        function showMoveAnimation(fromx, fromy, tox, toy) {
            var numberCell = document.getElementById("num-" + fromx + "-" + fromy);
            move(numberCell, {
                top: getPosT(tox, toy),
                left: getPosL(tox, toy)
            },
            {
                duration: 6000
            })
        }
        function isgameover() {
            if (nospace(aDigital)) {
                alert("请重新开始游戏，亲！")
            }
        }
        function moveLeft() {
            if (!canMoveLeft(aDigital)) {
                return false
            }
            for (var i = 0; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    if (aDigital[i][j] != 0) {
                        for (var k = 0; k < j; k++) {
                            if (aDigital[i][k] == 0 && noBlockHorizontal(i, k, j, aDigital)) {
                                showMoveAnimation(i, j, i, k);
                                aDigital[i][k] = aDigital[i][j];
                                aDigital[i][j] = 0;
                                continue
                            } else {
                                if (aDigital[i][k] == aDigital[i][j] && noBlockHorizontal(i, k, j, aDigital)) {
                                    showMoveAnimation(i, j, i, k);
                                    aDigital[i][k] += aDigital[i][j];
                                    aDigital[i][j] = 0;
                                    continue
                                }
                            }
                        }
                    }
                }
            }
            setTimeout(updateaDigView(), 200);
            return true
        }
        function moveRight() {
            if (!canMoveRight(aDigital)) {
                return false
            }
            for (var i = 0; i < 4; i++) {
                for (var j = 2; j >= 0; j--) {
                    if (aDigital[i][j] != 0) {
                        for (var k = 3; k > j; k--) {
                            if (aDigital[i][k] == 0 && noBlockHorizontal(i, j, k, aDigital)) {
                                showMoveAnimation(i, j, i, k);
                                aDigital[i][k] = aDigital[i][j];
                                aDigital[i][j] = 0;
                                continue
                            } else {
                                if (aDigital[i][k] == aDigital[i][j] && noBlockHorizontal(i, j, k, aDigital)) {
                                    showMoveAnimation(i, j, i, k);
                                    aDigital[i][k] *= 2;
                                    aDigital[i][j] = 0;
                                    continue
                                }
                            }
                        }
                    }
                }
            }
            setTimeout(updateaDigView(), 200);
            return true
        }
        function moveUp() {
            if (!canMoveUp(aDigital)) {
                return false
            }
            for (var j = 0; j < 4; j++) {
                for (var i = 1; i < 4; i++) {
                    if (aDigital[i][j] != 0) {
                        for (var k = 0; k < i; k++) {
                            if (aDigital[k][j] == 0 && noBlockVertical(j, k, i, aDigital)) {
                                showMoveAnimation(i, j, k, j);
                                aDigital[k][j] = aDigital[i][j];
                                aDigital[i][j] = 0;
                                continue
                            } else {
                                if (aDigital[k][j] == aDigital[i][j] && noBlockVertical(j, k, i, aDigital)) {
                                    showMoveAnimation(i, j, k, j);
                                    aDigital[k][j] *= 2;
                                    aDigital[i][j] = 0;
                                    continue
                                }
                            }
                        }
                    }
                }
            }
            setTimeout(updateaDigView(), 200);
            return true
        }
        function moveDown() {
            if (!canMoveDown(aDigital)) {
                return false
            }
            for (var j = 0; j < 4; j++) {
                for (var i = 2; i >= 0; i--) {
                    if (aDigital[i][j] != 0) {
                        for (var k = 3; k > i; k--) {
                            if (aDigital[k][j] == 0 && noBlockVertical(j, i, k, aDigital)) {
                                showMoveAnimation(i, j, k, j);
                                aDigital[k][j] = aDigital[i][j];
                                aDigital[i][j] = 0;
                                continue
                            } else {
                                if (aDigital[k][j] == aDigital[i][j] && noBlockVertical(j, i, k, aDigital)) {
                                    showMoveAnimation(i, j, k, j);
                                    aDigital[k][j] *= 2;
                                    aDigital[i][j] = 0;
                                    continue
                                }
                            }
                        }
                    }
                }
            }
            setTimeout(updateaDigView(), 200);
            return true
        }
        function getaDigBg(number) {
            switch (number) {
            case 2:
                return "#ffefe7";
                break;
            case 4:
                return "#fff8f5";
                break;
            case 8:
                return "#f0fffc";
                break;
            case 16:
                return "#f0fff2";
                break;
            case 32:
                return "#fafff0";
                break;
            case 64:
                return "#fffdf0";
                break;
            case 128:
                return "#fff8f0";
                break;
            case 256:
                return "#fff4f0";
                break;
            case 512:
                return "#fff0f0";
                break;
            case 1024:
                return "#f0f1ff";
                break;
            case 2048:
                return "#f8f0ff";
                break;
            case 4096:
                return "#fef0ff";
                break;
            case 8192:
                return "#fff0f9";
                break
            }
            return "black"
        }
        function getaDigCol(number) {
            if (number <= 4) {
                return "#776e65"
            }
            return "#e77f4b"
        }
        function nospace(aDigital) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (aDigital[i][j] == 0) {
                        return false
                    }
                }
            }
            return true
        }
        function getPosL(i, j) {
            return 20 + 120 * j
        }
        function getPosT(i, j) {
            return 20 + 120 * i
        }
        function canMoveLeft(aDigital) {
            for (var i = 0; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    if (aDigital[i][j] != 0) {
                        if (aDigital[i][j - 1] == 0 || aDigital[i][j - 1] == aDigital[i][j]) {
                            return true
                        }
                    }
                }
            }
            return false
        }
        function canMoveRight(aDigital) {
            for (var i = 0; i < 4; i++) {
                for (var j = 2; j >= 0; j--) {
                    if (aDigital[i][j] != 0) {
                        if (aDigital[i][j + 1] == 0 || aDigital[i][j + 1] == aDigital[i][j]) {
                            return true
                        }
                    }
                }
            }
            return false
        }
        function canMoveUp(aDigital) {
            for (var j = 0; j < 4; j++) {
                for (var i = 1; i < 4; i++) {
                    if (aDigital[i][j] != 0) {
                        if (aDigital[i - 1][j] == 0 || aDigital[i - 1][j] == aDigital[i][j]) {
                            return true
                        }
                    }
                }
            }
            return false
        }
        function canMoveDown(aDigital) {
            for (var j = 0; j < 4; j++) {
                for (var i = 2; i >= 0; i--) {
                    if (aDigital[i][j] != 0) {
                        if (aDigital[i + 1][j] == 0 || aDigital[i + 1][j] == aDigital[i][j]) {
                            return true
                        }
                    }
                }
            }
            return false
        }
        function noBlockHorizontal(row, col1, col2, aDigital) {
            for (var i = col1 + 1; i < col2; i++) {
                if (aDigital[row][i] != 0) {
                    return false
                }
            }
            return true
        }
        function noBlockVertical(col, row1, row2, aDigital) {
            for (var i = row1 + 1; i < row2; i++) {
                if (aDigital[i][col] != 0) {
                    return false
                }
            }
            return true
        }
        document.onkeydown = function(ev) {
            var oEvent = ev || event;
            switch (oEvent.keyCode) {
            case 49:
                if (moveLeft()) {
                    generateOneNumber();
                    isgameover()
                }
                break;
            case 50:
                if (moveUp()) {
                    generateOneNumber();
                    isgameover()
                }
                break;
            case 51:
                if (moveRight()) {
                    generateOneNumber();
                    isgameover()
                }
                break;
            case 52:
                if (moveDown()) {
                    generateOneNumber();
                    isgameover()
                }
                break;
            default:
                break
            }
        }
    }
})(); (function() {
    window.fnMyLast = function() {
        var oBox = document.getElementById("green"),
        oColl = getByClass(oBox, "collection")[0],
        oClose = getByClass(oBox, "close")[0],
        oShow = getByClass(oBox, "myTab")[0],
        oTbCn = getByClass(oBox, "tabContent")[0],
        oTabDiv = getByClass(oTbCn, "tabDiv"),
        aLi = oColl.getElementsByTagName("li");
        oClose.onclick = function() {
            oShow.style.display = "none";
            oTbCn.style.display = "none"

        };
        aLi[0].onclick = function() {
            oShow.style.display = oTbCn.style.display = oTabDiv[0].style.display = "block";
            myChrom()
        };
        for (var i = 1; i < aLi.length; i++) { (function(index) {
                aLi[i].onclick = function() {
                    for (var i = 0; i < aLi.length; i++) {
                        oTabDiv[0].style.display = "none"
                    }
                    oShow.style.display = oTbCn.style.display = oTabDiv[index].style.display = "block"
                }
            })(i)
        }
    }
})();
(function(){
		window.onload = function(){
		var oDiv = document.getElementById('div1');
		var timer = null;
		var bSys = false;
		window.onscroll = function(){
			if(bSys){
				clearInterval(timer);
			}
			bSys = true;
			var sT = document.documentElement.scrollTop||document.body.scrollTop;	
			if(sT>100){
				oDiv.style.display = 'block';
			}else{
				oDiv.style.display = 'none';
			}	
		};
		oDiv.onclick = function(){
			var start = document.documentElement.scrollTop||document.body.scrollTop;	
			var dis = 0 - start;
			var count = Math.round(2000/30);
			var n = 0;
			clearInterval(timer);
			timer = setInterval(function(){
				bSys = false;
				n++;
				var a = 1- n/count;
				var cur = start +dis*(1-Math.pow(a,3));
				document.documentElement.scrollTop = document.body.scrollTop = cur;
				if (n == count) {
					clearInterval(timer);
				}
			},30);
			
		};
	};	
})();