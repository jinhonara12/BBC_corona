(() => {
    
    const actions = {
        birdFlies(){
            document.querySelector('[data-index="2"] .bird').style.transform= `translateX(${window.innerWidth}px)`
        }
    }
    console.log(actions)

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0];
    let ioIndex;

    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index*1;
    });
    

    for(let i=0; i<stepElems.length; i++){
        io.observe(stepElems[i]);
        stepElems[i].setAttribute('data-index', i);
        graphicElems[i].setAttribute('data-index', i);
    }

    function activated(action){
        currentItem.classList.add('visible');
        if(action){
            actions[action]();
        }
    }
    function inactivated(){
        currentItem.classList.remove('visible')
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;     

        for(let i=ioIndex-1; i<ioIndex + 2; i++){
            step = stepElems[i];
            if(!step) continue
            boundingRect = step.getBoundingClientRect();
            // console.log(boundingRect.top, i)

            if(boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight *0.8){
                inactivated();
                currentItem = graphicElems[step.dataset.index];
                activated(currentItem.dataset.action);
            }
        }
    })

    activated();

})()