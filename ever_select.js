// ==UserScript==
// @name         ever select
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://219.224.69.10:8080/*
// @grant        GM_log
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';
    function xsxkOperStrip_quiet(jx0404id){
        //if(!window.confirm("提示：你确认选择当前课程班级？")){
        //	return;
        //}
        var rev = eval('(' + $.ajax({
            url:"/jsxsd/xsxkkc/bxxkOper",
            data:{
                jx0404id:jx0404id
            },
            async:false
        }).responseText + ')');
        if(rev.success){
            GM_log("选课成功！");
            return 1;
            //parent.window.document.getElementById("xkkbLi").className = "current";
            //	parent.window.document.getElementById("xkjgLi").className = "";
            //	parent.window.document.getElementById("xkrzLi").className = "";
            //	parent.window.document.getElementById("xktkLi").className = "";
            // don't fresh, we will do it later
            //刷新课表页面
            //$.post("/jsxsd/xsxkkc/comeInBxxk",function(result){
            //			window.location.reload();
            //	});
            //parent.window.frames["kbFrame"].location.href="/jsxsd/xsxkjg/xsxkkb";
        }else{
            GM_log(rev.message);
            return 0;
        }
    }
    function xsxkOper_Openo(jx0404id,xkzy,trjf){
				if(trjf!=null && trjf!=""){
					//积分必修是正整数
					var chk = /^[0-9]*[1-9][0-9]*$/;
					if(!chk.test(trjf)){
						alert("提示：选课投入积分必修是正整数！");
						return false;
					}
				}

				var rev = eval('(' + $.ajax({
					url:"/jsxsd/xsxkkc/ggxxkxkOper",
					data:{
						jx0404id:jx0404id,
						xkzy:xkzy,
						trjf:trjf
					},
					async:false
				}).responseText + ')');

				if(rev.success){
					/*alert("选课成功！");

					$("#xkzyView").window("close");
					$("#xkjfView").window("close");

					parent.window.document.getElementById("xkkbLi").className = "current";
					parent.window.document.getElementById("xkjgLi").className = "";
					parent.window.document.getElementById("xkrzLi").className = "";
				//	parent.window.document.getElementById("xktkLi").className = "";

					//刷新课表页面
					$.post("/jsxsd/xsxkkc/comeInGgxxkxk",function(result){
    							window.location.reload();
  						});
					parent.window.frames["kbFrame"].location.href="/jsxsd/xsxkjg/xsxkkb"; */

				}else{
                    GM_log(rev.message);
                    /*
					alert(rev.message);

					$.post("/jsxsdxkkc/comeInGgxxkxk",function(result){
    							window.location.reload();
  						});*/
				}
			}

    // url xklc_list
    //refresh until sth to select
    if(window.document.location.toString().search("xklc_list")!==-1){
        if($("td a")[0]!==undefined){
            window.document.location=$("td a")[0].href;
        }else{
            location.reload(true);
        }

    }

    //xsxk_index
    if(window.document.location.toString().search("xsxk_index")!==-1){
        $("#mainFrame")[0].src="/jsxsd/xsxkkc/comeInBxxk";
    }

    var selv=['孙阳'];
    var okc=0;
    //inside frame
    /*comeInBxxk*/
    if(window.document.location.toString().search("comeInBxxk")!==-1){
        var search = ()=>{
            selv.forEach(elem=>{
                GM_log($("tr").toArray());
                $("tr").toArray().forEach(ele=>{
                    let inner=ele.innerHTML.toString();
                    //GM_log(inner);
                    var match= inner.search(elem);
                    GM_log(match);
                    if(match!==-1){
                        const regxc = /javascript:xsxkOper\('(([0-9])*)'\)/g;
                        GM_log(inner);
                        var r=regxc.exec(inner);
                        var id=r[1];
                        GM_log(id);
                        okc+=xsxkOperStrip_quiet(id);
                    }
                });
            });
            if(okc===0){
                setTimeout(search,50);
            }else{
                alert("Done!,",okc);
            }
        };
        setTimeout(search,50);
    }
    function asyncall(funcc,arcc){
        return funcc(arcc);
    }
    //comeInGgxxkxk
    if(window.document.location.toString().search("comeInGgxxkxk")!==-1){
        //if you don't give up and keep trying, you will eventually get whatever you wants. javascript:xsxkFun('201620172002545');
        var  iwannatry=['201620172002547','201620172002517','201620172002516','201620172002491','201620172002537','201620172002545'];
        var f=()=>{
            iwannatry.forEach(elem=>{
                asyncall(xsxkOper_Openo,elem);
            });
            setTimeout(f,400);
        };
        setTimeout(f,400);

    }


    /*
     "<td class="center">070943A</td><td class="center">计算机网络技术与应用（双语）</td><td class="center">29</td>
     <td class="center">29</td><td class="center">3</td><td class="center">胡磊</td>
     <td class="center">1-16周 星期二 7-8节<br>1-16单周 星期五 3-4节</td><td class="center">博学楼-710<br>6机房</td>
     <td class="center">与已选课程 “计算机网络技术与应用（双语）” 冲突</td><td class="center"><a style="color:blue;text-decoration:underline;" href="javascript:xsxkOper('201620172001169');">选课</a></td>"
     */




    /*

     function xsxkOper(jx0404id){
				if(!window.confirm("提示：你确认选择当前课程班级？")){
					return;
				}
				var rev = eval('(' + $.ajax({
					url:"/jsxsd/xsxkkc/bxxkOper",
					data:{
						jx0404id:jx0404id
					},
					async:false
				}).responseText + ')');
				if(rev.success){
					alert("选课成功！");
					parent.window.document.getElementById("xkkbLi").className = "current";
					parent.window.document.getElementById("xkjgLi").className = "";
					parent.window.document.getElementById("xkrzLi").className = "";
				//	parent.window.document.getElementById("xktkLi").className = "";
					//刷新课表页面
					$.post("/jsxsd/xsxkkc/comeInBxxk",function(result){
    							window.location.reload();
  						});
					parent.window.frames["kbFrame"].location.href="/jsxsd/xsxkjg/xsxkkb";
				}else{
					alert(rev.message);
				}
			}
     */

    //javascript:xsxkFun('201620172002547');
    //javascript:xsxkFun('201620172002517');
    //javascript:xsxkFun('201620172002516');
})();
