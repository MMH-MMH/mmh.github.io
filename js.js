
$(document).ready(function() {

    

    ////////// IS IN ViewPORT

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        
        let width = Number(el.clientWidth);
        let height = Number(el.clientHeight);
        let fht = Number(screen.height);
        let fwd = Number(screen.width);
        
        return (
            rect.top <= fht-height
    
        );
    }
    
    // ///     Loading Animation

    var value = 0;
    var bar = $('#helpBar')[0];
    var loader = $('#loader')[0];
    document.getElementById("barValue").innerHTML = "Loading " + value.toString() + "%";

    function fn() { // Loading Animation funtion
        var cw = document.querySelector('#helpBar').offsetWidth;
        var fw = document.querySelector('#bar').offsetWidth;
        value = (Number)(Math.ceil((cw * 100) / fw));
        document.getElementById("barValue").innerHTML = "Loading " + value.toString() + "%";
    }



    //////// MAKE PIECHART //////////

    const cos = Math.cos, sin = Math.sin, pi = Math.PI;
    // VYIOBGR
    const circles = [
        {
            "color": "rgb(163, 34, 85)",
            "id": "c1",
            "rad": 100,
            "angle": 85
        },
        {
            "color": "rgb(105, 30, 70)",
            "id": "c2",
            "rad": 90,
            "angle": 80
        },
        {
            "color": "rgb(208, 96, 247)",
            "id": "c3",
            "rad": 80,
            "angle": 85
        },
        {
            "color": "rgb(21, 70, 125)",
            "id": "c4",
            "rad": 70,
            "angle": 80
        },
        {
            "color": "rgb(34, 167, 190)",
            "id": "c5",
            "rad": 60,
            "angle": 70
        },
        {
            "color": "rgb(193, 144, 55)",
            "id": "c6",
            "rad": 50,
            "angle": 75
        },
        {
            "color": "rgb(10, 68, 187)",
            "id": "c7",
            "rad": 40,
            "angle": 75
        },
        {
            "color": "rgb(135, 79, 42)",
            "id": "c8",
            "rad": 30,
            "angle": 65
        },
    ];

    // const barHeights = [
    //     {
    //         "id": "bar1",
    //         "color": "rgb(244, 0, 165)",
    //         "height": 70
    //     },
    //     {
    //         "id": "bar2",
    //         "color": "rgb(244, 0, 165)",
    //         "height": 30
    //     },
    //     {
    //         "id": "bar3",
    //         "color": "rgb(244, 0, 165)",
    //         "height": 90
    //     },
    //     {
    //         "id": "bar4",
    //         "color": "rgb(244, 0, 165)",
    //         "height": 40
    //     },
    //     {
    //         "id": "bar5",
    //         "color": "rgb(244, 0, 165)",
    //         "height": 55
    //     },
    //     {
    //         "id": "bar6",
    //         "color": "rgb(244, 0, 165)",
    //         "height": 70
    //     },
    //     {
    //         "id": "bar7",
    //         "color": "rgb(244, 0, 165)",
    //         "height": 30
    //     },
    //     {
    //         "id": "bar8",
    //         "color": "rgb(244, 0, 165)",
    //         "height": 90
    //     },
    //     {
    //         "id": "bar9",
    //         "color": "rgb(244, 0, 165)",
    //         "height": 40
    //     },
    //     {
    //         "id": "bar10",
    //         "color": "rgb(244, 0, 165)",
    //         "height": 55
    //     }
    // ];

    function update_arc() {
        var pie = document.querySelector('#pie');
        
        var pieWidth = pie.clientWidth;
        var pieHeight = pie.clientHeight;
        var cx = pieWidth/2, cy = pieHeight/2, deg = 270;

        for(let i = 0; i < circles.length; i++) {

            var cir = circles[i];
            var id = cir.id;
            var color = cir.color;
            var frad = Math.min(cx, cy);
            var rad = (frad*(cir.rad))/100;
            var dash = 2*pi*rad;
            var pie = document.getElementById(id);
            var bpie = document.getElementById('b'+id);

            pie.setAttribute( 'cx', (pieWidth/2).toString());
            pie.setAttribute( 'cy', (pieHeight/2).toString());
            pie.setAttribute( 'r', (rad).toString());
            pie.setAttribute( 'stroke', color);
            
            bpie.setAttribute( 'cx', (pieWidth/2).toString());
            bpie.setAttribute( 'cy', (pieHeight/2).toString());
            bpie.setAttribute( 'r', (rad).toString());
            
            var rot = '-90, '+cx+', '+cy;
            pie.setAttribute( 'transform', ('rotate('+rot+')').toString());
            bpie.setAttribute( 'transform', ('rotate('+rot+')').toString());

            var angle = Math.floor((cir.angle*360)/100);
            var arclen = Math.PI * rad * (360-angle) / 180.0;
            pie.style.strokeDasharray = dash;
            
            pie.style.strokeDashoffset = inview ? arclen : 2*pi*rad;

        }
        
      }

    // function update_bar_height(){

    //     for(let i=0; i<barHeights.length; i++){
    //         var bar = barHeights[i];
    //         var id = bar.id;
    //         var color = bar.color;
    //         var height = bar.height;
    //         var cbar = document.getElementById(id);
    //         cbar.style.backgroundColor = "rgb(255, 0, 105)";
            
    //         cbar.style.height = graphview ? (height.toString() + '%').toString() : "0%";
    //     }

    // }

    

    let barResizeObserver = new ResizeObserver(() => {
        if (value < 100) {
            fn();
        } else {
            setTimeout(() => {
                $('#loader').fadeOut(100);
                $('#logo').animate({
                    height: "200px",
                    width: "200px",
                    marginLeft: "60vw",
                    marginTop: "35vh"
                }, 500);

                $('#main').show();
                update_arc();
                // update_bar_height();
                AOS.init({
                    disable: false,
                    startEvent: 'DOMContentLoaded',
                    initClassName: 'aos-init',
                    animatedClassName: 'aos-animate',
                    useClassNames: false,
                    disableMutationObserver: false,
                    debounceDelay: 50,
                    throttleDelay: 99,
        
        
                    offset: 120,
                    delay: 0,
        
        
                    once: false,
                    mirror: false,
                    anchorPlacement: 'top-bottom',
        
                });
                
            }, 500);
            
        }
    })

    barResizeObserver.observe(bar);

    ////////  PIE CHART /////////

    

    var inview = false, graphview = false;
    
    $(window).scroll(() => {
    
        var pie = document.querySelector('#pie');
        inview = isInViewport(pie);
        update_arc();
        // var graph = document.querySelector('#graph');
        // graphview = isInViewport(graph);
        // update_bar_height();
        

    })

    $(window).resize(() => {
        update_arc();
        
    });

    // $('.keyFeatures').hover(() => {
    //     console.log("akjsdc");
    //     $(this).animate({
    //         backgroundColor: "white",
    //         color: "black"
    //     }, 500);
    // })

    
});
