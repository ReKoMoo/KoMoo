$(function () {                    /* 변수를 잡는다.. 어렵다... */
    var container = $('.slideshow'), /*변수명 지정 */
        slideGroup = container.find('.slideshow_slides'), /* find는 공백이 있으면 find 공백이없으면 filter */
        slides = slideGroup.find('a'), /* 각각의 그룹에 find를 사용하면 찾기가쉽다. */
        nav = container.find('.slideshow_nav'),
        indicator = container.find('.indicator'),
        slideCount = slides.length, /* 슬라이드의 숫자 */
        indicatorHTML = '', /* 빈값을 지정 */
        currentIndex = 0, /* 첫번째를 보게 */
        duration = 500,
        easing = 'easeInOutExpo', /* 애니메이터 문법을 사용 */
        interval = 3500,
        timer; /* indicatorHtml과 같은것임 이름만 지정 */
        

        var wind = $(window),
            header = $('.page-header'),
            headerOffsetTop = header.offset().top;
            console.log(headerOffsetTop);

        wind.scroll(function(){/* wind가 아닌(this)로 받아와도된다.*/
            if($(this).scrollTop() >= headerOffsetTop){
                header.addClass('sticky');
            }else{
                header.removeClass('sticky');
            }

        });

        /* 스크롤 버튼 */
        $(window).scroll(function(){
            if($(this).scrollTop() >= 300){/* 스크롤 300이하로 내려가면 버튼이 사라짐*/
                $('.go_top').fadeIn();/* 300이하로 내려가면 버튼이 생성*/
            }else{
                $('.go_top').fadeOut();/* 300이상 올라가면 버튼이 사라짐*/
            }
        });

        $('.go_top').click(function(e){ 
            /* preventDefault을 써줌으로써 
            클릭하여 스크롤이 올라갈때 부드럽게 1.5초간에 맞춰서 올라가 */
            e.preventDefault();
            $('html, body').animate({scrollTop:0},500);
        });
        /* go_top버튼을 클릭하면 html, body의 스크롤양이 0으로 바뀌도록 0.5s*/
    

        //슬라이드를 가로로 배열
        // slides 마다 할일 , left 값을 0%, 100%, 200%, 300%
        slides.each(function(i){
            $(this).css({left: 100 * i + '%'});
            //<a href=" ">1</a>
            // var i = 2;    i = i+2;    i + =2 라네
            // indicatorHtml + = ??
            // 이해는 조금은 했어도 설명하기가.. 거지같네
            indicatorHTML += '<a href="#">'+ (i + 1) + '</a>';
            
        });//slides.each
        //A.text(B); a요소의 b의 내용을 글씨 형태로 추가
        //A.html(B); a요소의 b의 내용을 html 형태로 추가
        console.log(indicatorHTML);
        indicator.html(indicatorHTML);

        //슬라이드 이동 함수
        function goToSlide(index){
            slideGroup.animate({left:-100 * index + '%'}, duration, easing);
            currentIndex = index;
            updateNav();
        }
    
        //인디케이터로 이동하기
        indicator.find('a').click(function(e){
            e.preventDefault();
            var idx = $(this).index();
            console.log(idx);
            goToSlide(idx);
        });

        /*updateNav() 버튼들 업데이트 함수 */	
	function updateNav(){
		var navPrev = nav.find('.prev');
		var navNext = nav.find('.next');
		
		if(currentIndex == 0){
			navPrev.addClass('disabled');
		}else{
			navPrev.removeClass('disabled');			
		}
		
		if(currentIndex == slideCount - 1){
			navNext.addClass('disabled');
		} else {
			navNext.removeClass('disabled');
        }
        
         //인디케이터의 active 업데이
		indicator.find('a').removeClass('active');
		indicator.find('a').eq(currentIndex).addClass('active');

    }
    
    nav.find('a').click(function(e){
        e.preventDefault();
        if($(this).hasClass('prev')){
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(currentIndex + 1);
        }
    });

    /* 인디케이더 클릭시 이동 */
indicator.find('a').click(function(e){
	e.preventDefault();
	//var idx = $(this).index();
	goToSlide($(this).index());
});


/*starTimer() 자동 슬라이드 시작 함수 */
	
function starTimer() {
    //setInterval(할일, 시간); nextindex  c0 n1, c1 n2, c2 n3, c3 n0
    timer = setInterval(function(){
        var nextIndex = (currentIndex + 1) % slideCount;
        goToSlide(nextIndex);
    }, interval);
}

/*stopTimer() 자동 슬라이드 종료 함수 */	

function stopTimer() {
    clearInterval(timer);
}
container.on({
    mouseenter:stopTimer,
    mouseleave:starTimer
});
/*
    container.mouseenter(function(){
        stopTimer();
    }
    .mouseleave(function(){
        starTimer();
    });
*/

/*stopTimer() 자동 슬라이드 종료 함수 */	
	
	function stopTimer() {
		clearInterval(timer);
	}
	
	goToSlide(currentIndex);		
	starTimer();
});
