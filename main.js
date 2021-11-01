// trying Cursor 
function cursor_event(){
    var cursor = document.getElementById('cursor');
    const container = document.querySelector('.container');
    container.addEventListener("mousemove", 
        function(e){
            var x = e.pageX;
            var y = e.pageY;
            cursor.style.left = x + "px";
            cursor.style.top = y + "px";
    });
}
//cursor_event();

// Redirect to the Indepth Page
function indepth_redirect(){
    location.href = "Indepth.html";
}

// Redirect to About Page
function about_redirect(){
    location.href = "about.html";
}

// Redirect to About Me Page
function about_me_redirect(){
    location.href = "about_me.html";
}

// Redirect back to the main page
function back_redirect(){
    location.href = "index.html";
}

// Properties Tab collapser
function button_collapse(){
    document.getElementsByClassName('box')[1].classList.toggle('box_active');
    document.getElementById('button_helper').classList.toggle('menu');    
    const item = document.getElementById('button_collapse');
    if (item.style.display == "flex"){
        item.style.display = 'none';
    }
    else{ item.style.display = "flex"; }
}

// Custom Create tab collapser
function input_collapse(){
    document.getElementsByClassName('box')[0].classList.toggle('box_active');
    const item = document.getElementById('input_collapse');
    if (item.style.display == "flex"){
        item.style.display = 'none';
    }
    else{ item.style.display = "flex"; }
}

var in_progress = false; // Global variable to check if any property is in progress.

//Trying to make an adder. Two elements glow and add up to become third. third element's innerHTML changes.
async function pascal_animator(){
    in_progress = true;
    const container = document.querySelector('.container');
    const arr = [
        [[1,0],[1,1],[2,1]], 
        [[2,0],[2,1],[3,1]], [[2,1], [2,2],[3,2]], 
        [[3,0],[3,1],[4,1]], [[3,1],[3,2],[4,2]], [[3,2],[3,3],[4,3]]
    ];
    const inner_nums = ["2","3","3","4","6","4"];
    k = 0
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].length;j++){
            x = arr[i][j][0];
            y = arr[i][j][1];
            container.getElementsByClassName("row")[x].getElementsByClassName('hexagon')[y].classList.toggle("pascal-animator");
            if(j==arr[i].length-1){
                container.getElementsByClassName("row")[x].getElementsByClassName('hexagon')[y].getElementsByClassName("text")[0].innerHTML = inner_nums[k];
                k += 1;
            }
        }
        await sleep(2000);
        for(let j=0;j<arr[i].length;j++){
            x = arr[i][j][0];
            y = arr[i][j][1];
            temp_ele = container.getElementsByClassName("row")[x].getElementsByClassName('hexagon')[y];
            temp_ele.classList.toggle("pascal-animator");
            new_ele = temp_ele.cloneNode(true);
            temp_ele.parentNode.replaceChild(new_ele, temp_ele);
        }
    }
    in_progress = false;
}
pascal_animator();

// Main Hexagon grid created
function createHexs(_default=false,prop3=null,prop4=null,inverse=false,prop14=null){
    const container = document.querySelector('.container');
    container.innerHTML = '';
    document.getElementById("textheader").innerHTML = "";
    document.getElementById("textdefine").innerHTML = "";
    
    //const numRange = [["1"], ["1", "1"], ["1", "2", "1"], ["1","3","3","1"], ["1","4","6","4","1"]]
    const hexagonPattern = [1];
    var numRange = Array();
    var index = Number(document.getElementById("Text1").value);
    document.getElementById('Text1').value = "";
    if (prop3 == null && prop4 == null){
        if (prop14 != null){ index = prop14; }
        if (index == 0 || index > 11 || _default){
            if (index > 11){
                alert("Number entered is out of range and Triangle may appear distorted, size was reset to default!");
            }
            for (let i=2; i<=5; i++){
                hexagonPattern.push(i);
            }
            index = 5;
            numRange = generatePascal(5);
        }
        else{
            for (let i = 2; i <= index; i++){
                hexagonPattern.push(i);
            }
            numRange = generatePascal(index);
        }
    }
    else{
        if(prop3 == null){ custom_idx = prop4; }
        else{ custom_idx = prop3; }
        for (let i = 2; i <= custom_idx; i++){
            hexagonPattern.push(i);
        }
        numRange = generatePascal(custom_idx);
        index = custom_idx;
        for (let i=0; i<numRange.length;i++){
            for (let j=0; j<numRange[i].length; j++){
                numRange[i][j] = numRange[i][j] % 2;
            }
        }
    }
    //console.log(generatePascal(5));
    //console.log(index);
    if (prop3 == 9){
        var temp_arrow = document.createElement('div');
        temp_arrow.classList = "arrow right";
        container.appendChild(temp_arrow);
    }
    document.getElementById("createhexagons").innerHTML = "Pascal Triangle with " + index + " rows is created!";
    for (let i = 0; i < hexagonPattern.length; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < hexagonPattern[i]; j++) {
            const hexagon = document.createElement('div');
            hexagon.classList.add('hexagon');
            const num = document.createElement('div');
            num.classList.add('text');
            if(inverse == true){ num.innerHTML = "1/"+numRange[i][j]; }
            else{ num.innerHTML = numRange[i][j]; }
            hexagon.appendChild(num);
            row.appendChild(hexagon);
        }
        container.appendChild(row);
        }
    //console.log(container);
}

// Generate the pascal triangle
function generatePascal(n){
    var arr = [];
    var tmp;
    for(var i=0;i<n;i++){
        arr[i]=[];
        for(var j=0; j<=i; j++){
            if(j==i){
                arr[i].push(1);
            }else{
                tmp = (!!arr[i-1][j-1]?arr[i-1][j-1]:0)+(!!arr[i-1][j]?arr[i-1][j]:0);
                arr[i].push(tmp);
            }
        }
    }
    return arr;
}

// Start of Properties ------------------------------------------------------------------------
// Helper fucntion 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Power of 2's Property
async function property1(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Power of 2's";
        document.getElementById('textdefine').innerHTML = "Observing the sum of each row: ";
        var item = document.createElement("div");
        item.classList.add("property1-display");
        container.appendChild(item);
        for(let i=0; i<5;i++){
            item.innerHTML = 2**i + "(2 <sup>" + i + "</sup>)";
            for(let j=0; j<=i; j++){
                container.getElementsByClassName("row")[i].getElementsByClassName('hexagon')[j].classList.toggle('property1');
            }
            await sleep(2000);
        }
        in_progress = false;
    }
}

// Power of 11's Property
async function property2(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Powers of 11";
        document.getElementById('textdefine').innerHTML = "Observing the unitary addition of each row: ";
        var item = document.createElement("div");
        item.classList.add("binomial");
        container.appendChild(item);
        for(let i=0; i<5;i++){
            var str = "";
            var pow = 10**i;
            var eval = 0
            for(let j=0; j<=i; j++){
                var temp = container.getElementsByClassName("row")[i].getElementsByClassName('hexagon')[j];
                temp.classList.toggle('property2');
                str += temp.textContent*pow;
                str += " + ";
                eval += temp.textContent*pow;
                pow = pow/10;
            }
            str += "0";
            item.innerHTML = str + " = " + eval + " (11"+ "<sup>" + i + "</sup>" + ")";
            await sleep(2000);
        }
        in_progress = false;
    }
}

// Line Symmetry Property
async function property3(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Line Symmetry";
        document.getElementById('textdefine').innerHTML = "Consider an imaginary line passing through the center, the triangle is symmetric through this line of reference.";
        //const arr = [[1,0],[1,1],[2,0],[2,2],[3,0],[3,3],[4,0],[4,4],[3,1],[3,2],[4,1],[4,3],[0,0],[2,1],[4,2]]; //8 R 4 B 3 D
        const arr = [[1,1],[2,2],[3,3],[4,4],[3,2],[4,3]]
        for(let i=0;i<arr.length;i++){
            x = arr[i][0];
            y = arr[i][1];
            container.getElementsByClassName("row")[x].getElementsByClassName('hexagon')[y].classList.toggle("property3");
        }
        const arr1 = [[0,0],[2,1],[4,2]];
        for(let i=0;i<3;i++){
            x = arr1[i][0];
            y = arr1[i][1];
            container.getElementsByClassName("row")[x].getElementsByClassName('hexagon')[y].classList.toggle("property3-center");
        }
        await sleep(2000);
        in_progress = false;
    }
}

// Combinatorics Property
async function property4(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Combinatorics <sup>n</sup>C<sub>r</sub>";
        document.getElementById('textdefine').innerHTML = "Observing some examples by going to the n<sup>th</sup> row and checking the r<sup>th</sup> element:";
        const arr = [[2,1],[3,1],[4,2]];
        var item = document.createElement("div");
        item.classList.add("binomial");
        container.appendChild(item);
        for(let i=0;i<3;i++){
            x = arr[i][0];
            y = arr[i][1];
            const temp = container.getElementsByClassName("row")[x].getElementsByClassName('hexagon')[y];
            item.innerHTML = "Row(n): " + x + ", Element(r): " + y + " => " + "<sup>" + x + "</sup>" + "C" + "<sub>" + y + "</sub>" + " = " + temp.textContent;
            temp.classList.toggle("property4");
            await sleep(4000);
        }
        in_progress = false;
    }
}

// Binomial Coefficients Property
async function property5(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Binomial Coefficient";
        document.getElementById('textdefine').innerHTML = "We can find the expansion of (a+b)<sup>n</sup> using n<sup>th</sup> row: ";
        const expansion = ["1*a<sup>0</sup> + 1*b<sup>0</sup>","1*a<sup>1</sup> + 1*b<sup>1</sup>",
                        "1*a<sup>2</sup> + 2*a*b + 1*b<sup>2</sup>", 
                        "1*a<sup>3</sup> + 3*a<sup>2</sup>*b + 3*a*b<sup>2</sup> + 1*b<sup>3</sup>", 
                        "1*a<sup>4</sup> + 4*a<sup>3</sup>*b + 6*a<sup>2</sup>*b<sup>2</sup> + 4*a*b<sup>3</sup> + 1*b<sup>4</sup>"];
        var item = document.createElement("div");
        item.classList.add("binomial");
        container.appendChild(item);
        for(let i=0; i<5;i++){
            item.innerHTML = "(a+b)<sup>" + i + "</sup> = " + expansion[i];
            for(let j=0; j<=i; j++){
                container.getElementsByClassName("row")[i].getElementsByClassName('hexagon')[j].classList.toggle('property5');
            }
            await sleep(2000);
        }
        in_progress = false;
    }
}

// Prime Number checker Property
async function property6(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Prime Number verification";
        document.getElementById('textdefine').innerHTML = "We can verify any number <strong>N</strong> is prime using the N<sup>th</sup> row by checking \
        if all the numbers are divisible by N(ignoring the 1's) <br> As a example, N=4, We can see 6 is not divisible by 4 and hence is <u>not prime.</u>";
        container.getElementsByClassName("row")[0].getElementsByClassName('hexagon')[0].classList.toggle('property6-dull');
        for(let i=1;i<5;i++){
            container.getElementsByClassName("row")[i].getElementsByClassName('hexagon')[i].classList.toggle('property6-dull');
            container.getElementsByClassName("row")[i].getElementsByClassName('hexagon')[0].classList.toggle('property6-dull');
        }
        for(let i=1;i<4;i++){
            container.getElementsByClassName("row")[4].getElementsByClassName('hexagon')[i].classList.toggle('property6');
        }
        await sleep(2000);
        in_progress = false;
    }
}

// Diagonals Property 
async function property7(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Diagonals Magic";
        document.getElementById('textdefine').innerHTML = "Each diagonal represents special set of numbers.";
        var arr = [];
        for(let i=0;i<5;i++){
            arr.push([]);
            for(let j=i; j<5;j++){
                arr[arr.length-1].push([j,i]);
            }
        }
        const item = document.createElement("div");
        item.classList.add("binomial");
        container.appendChild(item);
        const props = ["1<sup>st</sup> diagonal has every element same!", "2<sup>nd</sup> diagonal elements are all Natural Numbers!", 
        "3<sup>rd</sup> diagonal elements are all Triangluar Numbers!", "4<sup>th</sup> diagonal elements are all Tetrahedral Numbers!",
        "And similarly it goes on.."];
        for(let i=0;i<5;i++){
            item.innerHTML = props[i];
            for(let j=0;j<arr[i].length;j++){
                x = arr[i][j][0];
                y = arr[i][j][1];
                container.getElementsByClassName("row")[x].getElementsByClassName('hexagon')[y].classList.toggle('property7');
            }
            await sleep(4000);
        }
        in_progress = false;
    }
}

// Fibonacci Sequence Property
async function property8(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=false,prop3=null,prop4=null,inverse=false,prop14=6);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Fibonacci Sequence";
        document.getElementById('textdefine').innerHTML = "Lets observe the 45 degree diagonals to obtain the Fibonacci Sequence:";
        const arr = [[[0,0]],[[1,0]],[[2,0],[1,1]],[[3,0], [2,1]], [[4,0], [3,1],[2,2]], [[3,2],[4,1],[5,0]]];
        const item = document.createElement('div');
        item.classList.add('property8-text');
        container.appendChild(item);
        const fibo = [0,1];
        
        for(let k=0;k<6;k++){
            fibo.push(fibo[fibo.length-1]+fibo[fibo.length-2]);
        }

        for(let i=0;i<arr.length;i++){
            for(let j=0;j<arr[i].length;j++){
                x = arr[i][j][0];
                y = arr[i][j][1];
                container.getElementsByClassName("row")[x].getElementsByClassName('hexagon')[y].classList.toggle("property8");
            }
            item.innerHTML += fibo[i+1] + ", ";
            await sleep(2000);
        }
        item.innerHTML += "....."
        in_progress = false;
    }
}

// Serpinski's Triangle Property
async function property9(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true,prop3=null,prop4=8);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Sierpinski’s Triangle";
        document.getElementById('textdefine').innerHTML = "After coloring all the odd terms in Pascal's Triangle,\
        We get a fractal pattern commonly known as Sierpinski’s Triangle.";
        for(let i=0; i<8;i++){
            for(let j=0; j<=i; j++){
                var temp = container.getElementsByClassName("row")[i].getElementsByClassName('hexagon')[j];
                if (temp.textContent % 2 == 0){
                    temp.classList.toggle("property9");
                }

            }
        }
        await sleep(2000);
        in_progress = false;
    }
}

// Binary Form Property 
async function property10(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true,prop3=9);
        const container = document.querySelector(".container");
        const root = document.querySelector(":root");
        document.getElementById('textheader').innerHTML = "Binary Property";
        const text_define = document.getElementById('textdefine');
        text_define.innerHTML = "When in binary form, each row in decimal form \
        either is a Prime number or product of the previous number.<br>Primes Numbers obtained are called\
        Fermat Primes: ";
        const text_element = document.createElement('div');
        text_element.classList.add('property10-text');
        //text_element.innerHTML = "PRIME";
        container.appendChild(text_element);
        const display_nums = ["1","3","5","15","17","51","85","255","257"];
        const fermat = [false, true, true, false, true, false, false, false, true];
        // 3, 5, 17, 257
        var top_arrow = 60;
        var left_arrow = 60;
        var top_text = -690;
        var left_text = 120;
        for(let i=0;i<9;i++){
            if(fermat[i]){
                if(i == 8){ text_define.innerHTML += display_nums[i] + "."; }
                else{ text_define.innerHTML += display_nums[i] + ", "; }
            }
            text_element.innerHTML = display_nums[i];
            root.style.setProperty("--arrow_top", top_arrow+"px");
            root.style.setProperty("--arrow_left", left_arrow+"px");
            root.style.setProperty("--text_top", top_text+"px");
            root.style.setProperty("--text_left", left_text+"px");
            top_arrow += 80;
            top_text += 80;
            left_arrow += 55;
            left_text += 55;
            await sleep(2000);
        }
        in_progress = false;
    }
}

// Hexagon Product or Alternate Product
async function property11(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Alternate Product Property";
        document.getElementById('textdefine').innerHTML = "When an element with 6 sides is observed, \
        the product of the alternate elements is equal.<br>Here 3 is under observation, the alternate\
        element products equal<strong> 6 * 2 * 1 == 4 * 3 * 1 = 12</strong>.";
        const arr = [[3,2],[2,1],[4,1],[3,0],[2,0],[4,2]]; // 1 2 1 2 1 2
        const props = ["property11-alt1", "property11-alt2"];
        container.getElementsByClassName("row")[3].getElementsByClassName('hexagon')[1].classList.toggle("property11-center");
        for(let i=0;i<6;i++){
            x = arr[i][0];
            y = arr[i][1];
            //console.log(x, y, i%2);
            container.getElementsByClassName("row")[x].getElementsByClassName('hexagon')[y].classList.toggle(props[i%2]);
        }
        await sleep(2000);
        in_progress = false;
    }
}

// Hockey Stick Property
async function property12(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true);
        const container = document.querySelector(".container");
        //console.log(container);
        document.getElementById('textheader').innerHTML = "Hockey Stick Property";
        document.getElementById('textdefine').innerHTML = "Consider the Stick in this case as: [1, 2, 3].\
        The addition of the Stick is 6. <br>Since, we start from top-left the element, the element to the\
        bottom-right is 6 which is the Front part of the stick.";
        const arr = [[1,1],[2,1],[3,1]];
        for(let i=0;i<arr.length;i++){
            x = arr[i][0];
            y = arr[i][1];
            container.getElementsByClassName("row")[x].getElementsByClassName('hexagon')[y].classList.toggle("property12-hockey");
        }
        container.getElementsByClassName("row")[4].getElementsByClassName('hexagon')[2].classList.toggle("property12-stick");
        await sleep(2000);
        in_progress = false;
    }
}

// Obtaining Pi Property
async function property13(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true, prop3=null, prop4=null,inverse=true);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Reciprocal pattern to &#960;?";
        document.getElementById('textdefine').innerHTML = "The alternate addition and subtraction of Reciprocal\
        elements of the 2<sup>nd</sup> diagonal give &#960;-2.<br>That is, 1 - (1/3) + (1/6) - (1/10)........ = &#960; - 2";
        const j = 2;
        for(let i=2;i<5;i++){
            container.getElementsByClassName("row")[i].getElementsByClassName('hexagon')[j].classList.toggle("property13");
        }
        await sleep(2000);
        in_progress = false;
    }
}

// Obtaning e=2.71 Property
async function property14(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Euler's Number?";
        document.getElementById('textdefine').innerHTML = "Using product of rows we conclude the following formula: (p<sub>n+1</sub>* p<sub>n-1</sub>) / \
        (p<sub>n</sub>)<sup>2</sup> = (1 + (1/n))<sup>n</sup><br>Now as the equation tends to e (2.71), As n tends to infinity.<br>";
        const item = document.createElement("div");
        item.classList.add("binomial");
        container.appendChild(item);
        var prod = 1;
        for(let i=2;i<5;i++){
            prod = 1;
            for(let j=0;j<=i;j++){
                const temp = container.getElementsByClassName("row")[i].getElementsByClassName('hexagon')[j];
                temp.classList.toggle("property14");
                prod = prod * temp.textContent;
            }
            item.innerHTML = "Product of row number " + i + " is " + prod + ".";
            await sleep(4000);
        }
        item.innerHTML = "(96 * 2) / 9 <sup>2</sup> = 2.3703";
        in_progress = false;
    }
}

// Circle Mad Max property
function create_circle(){
    const base = document.getElementById("create_circle_prop15");
    base.style.display = "block";
    base.innerHTML = "";
    // to display base.appendChild
    base.style.display = "block";
    const point_div = document.createElement('div');
    point_div.id = "point_prop15";
    const line_div = document.createElement("div");
    line_div.id = "line_prop15";
    for(let i=0;i<4;i++){
        // point addition
        temp_pnt = document.createElement("div");
        temp_pnt.classList.add("point1");
        point_div.appendChild(temp_pnt);
        // line addition
        temp_line = document.createElement('div');
        temp_line.classList.add('outer-line');
        line_div.appendChild(temp_line);
    }
    temp = document.createElement("div");
    temp.classList.add("point1");
    temp.style.opacity = 0;
    point_div.appendChild(temp);

    temp_line = document.createElement('div');
    temp_line.classList.add('inner-line1');
    line_div.appendChild(temp_line);
    temp_line = document.createElement('div');
    temp_line.classList.add('inner-line2');
    line_div.appendChild(temp_line);
    base.appendChild(point_div);
    base.appendChild(line_div);
}

async function property15(){
    if( in_progress == false ){
        in_progress = true;
        createHexs(_default=true);
        const container = document.querySelector(".container");
        document.getElementById('textheader').innerHTML = "Circle Mad Max";
        document.getElementById('textdefine').innerHTML = "Assuming a circle with 4 points, then the 4<sup>th</sup> row gives..";
        const item = document.createElement("div");
        item.classList.add('binomial');
        container.appendChild(item);
        container.getElementsByClassName("row")[4].getElementsByClassName('hexagon')[0].classList.toggle("property15-ends");
        create_circle();
        // fetch the points first
        const points = document.getElementsByClassName("point1");
        for(let i=0; i<points.length;i++){
            points[i].classList.toggle('property15-point');
        }
        item.innerHTML = "First value represents 4 points on the circle.."
        container.getElementsByClassName("row")[4].getElementsByClassName('hexagon')[1].classList.toggle("property15");
        await sleep(5000);
        // fetch the lines now
        const lines = document.getElementById("line_prop15").childNodes;
        for(let i=0;i<lines.length;i++){
            lines[i].classList.toggle('property15-line');
        }
        item.innerHTML = "Second value represents 6 lines created by points.."
        container.getElementsByClassName("row")[4].getElementsByClassName('hexagon')[2].classList.toggle("property15");
        await sleep(5000);
        // fetch the triangles
        const arr = [[0,1,4], [2,3,4], [1,2,5],[0,3,5]];
        item.innerHTML = "Third value represents 4 triangles created by the points.."
        container.getElementsByClassName("row")[4].getElementsByClassName('hexagon')[3].classList.toggle("property15");
        for(let i=0;i<arr.length;i++){
            for(let j=0;j<3;j++){
                lines[arr[i][j]].classList.toggle("triangle"+(i+1));
            }
            await sleep(2000);
        }
        await sleep(2000);
        // fetch the quadrilateral 
        item.innerHTML = "Fourth value represents 1 quadrilateral created by the points.."
        container.getElementsByClassName("row")[4].getElementsByClassName('hexagon')[4].classList.toggle("property15");
        for(let i=0;i<4;i++){
            lines[i].classList = "outer-line";
            lines[i].classList.toggle('property15-quad');
        }
        await sleep(4000);
        const base = document.getElementById("create_circle_prop15");
        base.innerHTML = "";
        base.style.display = "none";
        in_progress = false;
    }
}

// INDEPTH PAGE ---------------------------------------------------------------------------------------------
/*
function indepth_collapser(){
    var coll = document.getElementsByClassName("indepth_property_collapser");
    for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("indepth_collapser_active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    });
    }
}
//indepth_collapser();

function indepth_expansion_generator(){
    var item = document.getElementById("indepth_expansion");
    item.innerHTML = "(x+y)<sup>n</sup> = <sup>n</sup>C<sub>0</sub> x<sup>n</sup> y<sup>0</sup>";
    for(let i=1;i<6;i++){
        item.innerHTML += " + <sup>n</sup>C<sub>" + i + "</sub> x<sup>n-" + i + "</sup> y<sup>" + i + "</sup>";
    }
    item.innerHTML += "+ ............. + <sup>n</sup>C<sub>n</sub> x<sup>0</sup> y<sup>n</sup>.";
}
*/

// About Me page-------------------------------------------------------------------
/*
function calculate_bounds(query){
    el = document.getElementsByClassName(query)[0];
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
    //console.log("PARTIAL",elemTop < window.innerHeight && elemBottom >= 0);
}

function skills_bounds(query){
    var top = window.pageYOffset + window.innerHeight;
    isVisible = top > document.getElementById(query).offsetTop;
    return isVisible;
}

function skills_scrollevent(){
    document.addEventListener("scroll", function(e){
        const root = document.querySelector(":root");
        
        // This works 
        // el = document.getElementsByClassName('skills_header')[0];
        // var rect = el.getBoundingClientRect();
        // var elemTop = rect.top;
        // var elemBottom = rect.bottom;
        // console.log("FULLY", (elemTop >= 0) && (elemBottom <= window.innerHeight));
        // console.log("PARTIAL",elemTop < window.innerHeight && elemBottom >= 0);

        //  Skills animation
        var leftbar = document.getElementsByClassName("skills_leftbar")[0];
        var rightbar = document.getElementsByClassName("skills_rightbar")[0];
        isVisible = skills_bounds("skills_tab");
        if(isVisible){ 
            leftbar.classList.add("sidebar-animate");
            rightbar.classList.add("sidebar-animate");
            root.style.setProperty("--animate_skills", "progress");
            return;
        }
        leftbar.classList.remove("sidebar-animate");
        rightbar.classList.remove("sidebar-animate");
        root.style.setProperty("--animate_skills", "none");
    })  
}
skills_scrollevent();

edu_progress = false;
function education_scrollevent(){
    document.addEventListener("scroll", function(e){
        var leftbar = document.getElementsByClassName("education_leftbar")[0];
        var rightbar = document.getElementsByClassName("education_rightbar")[0];
        isVisible = calculate_bounds("education_header");
        if (isVisible){
            leftbar.classList.add("sidebar-animate");
            rightbar.classList.add("sidebar-animate");
            if (!edu_progress){
                education_animate();
                edu_progress = true;
            }
            return;
        }
        leftbar.classList.remove("sidebar-animate");
        rightbar.classList.remove("sidebar-animate");
    })
}
education_scrollevent();

function intially_disabled(){
    const item = document.querySelectorAll("#edu_circles > div");
    const cards = document.querySelectorAll("#edu_cards > div");
    for(let i=0;i<4;i++){
        item[i].classList.toggle("disabled");
    }
}

async function education_animate(){
    const item = document.querySelectorAll("#edu_circles > div");
    const cards = document.querySelectorAll("#edu_cards > div");
    for(let i=0;i<4;i++){
        item[i].classList.toggle("disabled");
        if(i < 3){ cards[i].classList.toggle("fadein"); }
        await sleep(4000);
    }
}
intially_disabled();

function project_scrollevent(){
    document.addEventListener("scroll", function(e){
        var leftbar = document.getElementsByClassName("project_leftbar")[0];
        var rightbar = document.getElementsByClassName("project_rightbar")[0];
        isVisible = calculate_bounds("project_header");
        if (isVisible){
            leftbar.classList.add("sidebar-animate");
            rightbar.classList.add("sidebar-animate");
            return;
        }
        leftbar.classList.remove("sidebar-animate");
        rightbar.classList.remove("sidebar-animate");
    })
}
project_scrollevent();

function project_listener(idx, required_id){
    const dis = document.getElementsByClassName("project_display");
    for(let i=0; i<dis.length; i++){
        dis[i].style.display = "none";
    }
    const pro = document.getElementsByClassName("project");
    for(let i=0; i<pro.length;i++){
        pro[i].classList.remove("project_active");
    }
    document.getElementById(required_id).style.display = "block";
    pro[idx].classList.add("project_active");
}

function project_activator(){
    const arr = ["django_blog", "drf_blog", "kivy_app"]
    for(let i=0;i<3;i++){
        document.getElementsByClassName("project")[i].addEventListener("click", function(){
            project_listener(i, arr[i]);
        })
    }
    document.getElementsByClassName("project")[0].click();
}
project_activator();


function experince_scrollevent(){
    document.addEventListener("scroll", function(e){
        var leftbar = document.getElementsByClassName("experience_leftbar")[0];
        var rightbar = document.getElementsByClassName("experience_rightbar")[0];
        isVisible = calculate_bounds("experience_header");
        if (isVisible){
            leftbar.classList.add("sidebar-animate");
            rightbar.classList.add("sidebar-animate");
            return;
        }
        leftbar.classList.remove("sidebar-animate");
        rightbar.classList.remove("sidebar-animate");
    })
}
experince_scrollevent();
*/

