;(function(){
    var all = $(".section2_group_unit"),
        yf  = $(".section2_years_con"),
        po  = $(".section2_group_unit_pannel"),
        d_o = $(".section2_lb"),fx;
    yf.find("a").click(function(){
        var y = $(this).html();
        shine(y);
        var o = all.not(".dark").first();
        update_desc(o.data("title"),o.data("desc"),y);
    });
    all.children("img").click(function(){
        var o = $(this).parent();
        var y = o.data("year");
        shine(y);
        panel_show(o);
        update_desc(o.data("title"),o.data("desc"),y);
    });
    po.find(".close").click(function(){
        panel_hide($(this).parents(".section2_group_unit"));
    });
    function shine(year){
        all.each(function(){
            var obj_year = $(this).data("year");
            if(year == obj_year)
                $(this).removeClass("dark");
            else
                $(this).addClass("dark");
        });
        yf.find("a").each(function(){
            var o = $(this).parent();
            if($(this).html() == year)
                o.addClass("actived");
            else
                o.removeClass("actived");
        });
    }
    function panel_show(obj){
        panel_hide(obj).promise().done(function(){
            obj.removeClass("actived");
            obj.addClass("actived");
            obj.find(".section2_group_unit_pannel").fadeTo(300,1);
        });
    }
    function panel_hide(){
        return  all.filter(".actived").find(".section2_group_unit_pannel").fadeTo(300,0,function(){
                    $(this).parent().removeClass("actived");
                });
    }
    function update_desc(title,desc,year){
        d_o.find("div").html(year);
        d_o.find("span").html(title);
        d_o.find("p").html(desc);
    }
})();
$(function(){
    var s_arr = [];
    var obj = $(".header_nav li")
    var lock = 0;
    $(".section3_sbar").jScrollPane();
    $(".section1_sbar").jScrollPane();

    $(".section1 .p-tab_head a").click(function(){
        var p = $(this).parents("ul");
        var index = $(this).parent().index();
        var w = $(".section1_tab1").width();
        p.find("a").removeClass("actived");
        $(this).addClass("actived");
        $(".section1_ptab").animate({left:-index*w},300);

    });
    $(".header_nav li").click(function(){
        var obj = $("."+$(this).data("div"));
        s_shine($(this));
        lock = 1;
        $('html, body').animate({
            scrollTop: obj.offset().top - 85
        }, 500,function(){
            lock = 0;
        });
    });
    $(".header_nav li").each(function(){
        s_arr.push($("."+$(this).data("div")).offset().top);
    });
    $(window).scroll(function(){
        if(!lock){
            var t = $(window).scrollTop();
            if(t>0 && t<=s_arr[0]){
                s_shine(obj.eq(0));
                return ;
            }
            if(t>s_arr[0] && t<=s_arr[1]){
                s_shine(obj.eq(1));
                return ;
            }
            if(t>s_arr[1] && t<=s_arr[2]){
                s_shine(obj.eq(2));
                return ;
            }
            if(t>s_arr[2] && t<=s_arr[3]){
                s_shine(obj.eq(3));
                return ;
            }
        }
    });
    function s_shine(obj){
        $(".header_nav li span").addClass("hide");
        $(".header_nav li .green_point").removeClass("green_point").addClass("white_point");
        obj.find("span").removeClass("hide");
        obj.find(".white_point").removeClass("white_point").addClass("green_point");
    }
});
