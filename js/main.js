const NAV_OFFSET = 132 + 30;
const VIEWPORT_SM = 768;
const VIEWPORT_MD = 992;
const VIEWPORT_LG = 1200
$(document).ready(function(){

    $('.tabs').tabs();
    $('.modal').modal();
    $('.sidenav').sidenav();
    setToggleTitlePos();
    $('.tab-group').each(function(){
        $(this).find('.toggle-title').first().addClass('show');
    })

    $(function theming(){
        var currentTheme = 'lime';
        $('.theme-trigger').click(function(){
            newTheme = $(this).html();
            $('.'+currentTheme).removeClass(currentTheme).addClass(newTheme);
            currentTheme = newTheme
        })
    })

    $(function(){
        $('.nav-link').click(function(){
            var targettab = $(this).attr('target-tab');
            var targetdiv = $(this).attr('target-div');
            if (!targettab || !targetdiv) {
                return;
            }
            let tabs = document.getElementById('tabs');
            let instance = M.Tabs.getInstance(tabs);
            var current_tab = "tab" + (instance.index + 1);
            instance.select(targettab);
            if (current_tab == targettab) {
                $('html,body').animate({
                    scrollTop: $('#'+targetdiv).offset().top - NAV_OFFSET
                }, 1000);
            } else {
                var toggle_title = $('#'+current_tab).find('.toggle-title');
                toggle_title.removeClass("show");
                toggle_title.first().addClass('show');
                $('html,body').scrollTop($('#'+targetdiv).offset().top - NAV_OFFSET);
            }
        })
    })

    $(function bottomFab(){
        $('.bottom-right-fab.main').click(function(){
            $(this).toggleClass('pulse');
            $('.bottom-right-fab.sub').each(function(index){
                $(this).toggleClass('visible-'+(index+1));
            })

        })
    })

    $(function toggleTitle(){
        let tabs = document.getElementById('tabs');
        let instance = M.Tabs.getInstance(tabs);
        $(document).scroll(function(){
            let currenttab = getCurrentTab()
            currenttab.find('.dashboard-container').each(function(){
            let coordinate = $(this)[0].getBoundingClientRect();
            let y_co = coordinate.y;
            if (y_co - NAV_OFFSET ==0 || (NAV_OFFSET - y_co) <=$(this).outerHeight() && (NAV_OFFSET - y_co) >= 0) {
            $(this).find('.toggle-title').addClass('show');
            $(this).find('.toggle-title').removeClass('reverse');
            } else {
            $(this).find('.toggle-title').addClass('reverse');
            $(this).find('.toggle-title').removeClass('show');
            }
        })
        })
        $(window).resize(function(){
        setToggleTitlePos();
        })
    })

    function setToggleTitlePos() {
        $('.toggle-title').each(function(index){
        let width = $(window).width()/2 - $('.container').width()/2;
        if ((index+1) % 2 != 0) {
            var pos = 'right';
        } else {
            var pos = 'left';
        }
        $(this).css(pos, width+'px');
        $(this).addClass(pos);
        })
    }
    function getCurrentTab() {
        let instance = M.Tabs.getInstance(tabs);
        let tabindex = instance.index + 1;
        return $('#tab'+ tabindex);
    }

    function onViewportBreakpoint(width) {
        if (width == VIEWPORT_LG || width == VIEWPORT_MD || width == VIEWPORT_SM) {
        return true;
        }
        return false;
    }
});