let x1,x2,y1,y2;
let num_op;
let cap,cap2;
let size_pen = 1;
let poly = 0,poly_NumberOfexe = 0;
let start = 1,g_start=-1;
let icon, icon2;
let gx1,gx2,gy1,gy2;
let op = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//도구 선택상태 저장
let c = [0, 0, 0];//현재 색상 배열
let s_r = [0, 0];//저장,캔버스 초기화 상태 여부 저장
let px = [0, 0, 0, 0, 0, 0, 0];//다각형x좌표
let py = [0, 0, 0, 0, 0, 0, 0];//다각형y좌표
let up_down = [0, 0];//pensize증가 감소 상태 여부 저장
let paletteColors = [];//컬러파레트 색상 배열

const op_number = 12; //도구기능 옵션 개수

function preload() {
  icon = loadImage("icon.png");
  icon2 = loadImage("save_del.png");
}

function setup() {
  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
  createCanvas(1980, 1280);
  background(255);
  color_set();
}

function draw() {
  num_op = op.indexOf(1);
  play_op();
  color_palette();
  set_menu();
  Save_and_reset();
  menu_icon();
  draw_pensizeIcon();
  pensizeIcon();
  fill(c);
  noStroke();
  rect(250, 50, 100, 100);
}

//함수정의
function set_menu() {
  noStroke();
  fill(230);
  rect(0, 0, 200, height);
  rect(0, 0, width, 46);
  rect(0, 162, width, 38);
  rect(0, 0, 465, 200);
  rect(1295, 0, 1000, 200);
  fill(200);
  rect(200, 200, 20, height);
  rect(200, 200, width, 20);
  rect(1500, 200, 480, height);
  rect(200, 1200, width, 80);
  fill(220);
  rect(210, 10, 180, 180);
  fill(200);
  rect(25, 250, 150, 450);
  rect(1410, 40, 250, 125);
  rect(1730, 70, 52, 52);
  rect(1730 + 50 * 2.5, 70, 52, 52);
  stroke(200);
  strokeWeight(3);
  noFill();
  rect(465, 45, 830, 115);
  rect(210, 15, 180, 170);
} //그림판 밖 회색 틀 그리기

function color_set() {
  for (let for_r = 255, for_g = 0, for_b = 0, i = 1, result = 0, n = 200;i <= 24;i++){
    if (i % 2 == 0) paletteColors[i] = color(for_r, for_g, for_b);
    else if (i % 2 != 0)
      paletteColors[i] = color(for_r + 100, for_g + 100, for_b + 100);
    switch (i) {
      case 11:
        paletteColors[i] = color(117, 0, 219);
        break;
      case 13:
        paletteColors[i] = color(0, 172, 92);
        break;
      case 14:
        paletteColors[i] = color(132, 158, 3);
        break;
      case 15:
        paletteColors[i] = color(90, 154, 122);
        break;
      case 16:
        paletteColors[i] = color(182, 109, 0);
        break;
      case 19:
        paletteColors[i] = color(255, 212, 186);
        break;
      case 20:
        paletteColors[i] = color(223, 119, 87);
        break;
    }

    if (i % 4 === 0) result++;

    if (i % 2 == 0) {
      switch (result) {
        case 0:
          for_b += n;
          break;
        case 1:
          for_r -= n;
          break;
        case 2:
          for_g += n;
          break;
        case 3:
          for_b -= n;
          break;
        case 4:
          for_r += n;
          break;
        case 5:
          for_g -= n;
          break;
        default:
      }
    }
  }
}//컬러파레트 색상 배열 paletteColor에 저장

function color_palette(){
  noStroke();
  fill(245);
  rect(400, 40, 1300, 130);

  for (let p = 0, t = 50, x = 415, y = 50, i = 0; i < 6; i++, p += t) {
    size = 50;
    if (i < 3) x += size + 5;
    else if (i == 3) y += size + 5;
    else if (i > 3) x -= size + 5;
    fill(p);
    rect(x, y, size, size);
  } //흑백 6개 그리기

  for (let i = 1, x = 635, y = 50; i <= 24; i++) {
    let size = 50;
    fill(paletteColors[i]);
    rect(x, y, size, size);
    if (i % 2 == 0) {
      y -= size + 5;
      x += size + 5;
    } else if (i % 2 != 0) y += size + 5;
  }//나머지 컬러들 그리기 
}//컬러파레트 생성
function menu_icon() {
  noStroke();
  let x = 25,
    y = 250,
    size = 70;
  for (let i = 0; i < op_number; i++) {
    fill(245 - 20 * op[i]);
    rect(x, y, size, size);
    if (i % 2 == 0) x += size + 5;
    else {
      x -= size + 5;
      y += size + 5;
    }
  }
  draw_icon();
} //왼쪽에 있는 작업기능 아이콘 바탕 생성
function draw_icon() {
  let x = 25;
  let y = 250;
  image(icon, x - 10, y - 30, 110 * 1.5, 350 * 1.5);//왼쪽 작업기능 이미지
  x = 1400;
  y = 40;
  image(icon2, x + 10, y - 5, 439 / 2, 266 / 2);//저장&초기화 이미지 
} //아이콘 이미지 생성

function get_opNumber() {
  let x = 25,
    y = 250,
    size = 70;
  for (let i = 0; i < op_number; i++) {
    if (mouseX > x && mouseX < x + size) {
      if (mouseY > y && mouseY < y + size) {
        for (let q = 0; q < 12; q++) {
          op[q] = 0;
        }
        op[i] = 1;
      }
    }
    if (i % 2 === 0) x += size + 5;
    else {
      x -= size + 5;
      y += size + 5;
    }
  }
} //도구 종류 클릭 시 실행 기능에 따른 배열 op[]의 값 지정

function play_op() {
  if (num_op === 2) op2_spoid();

  if (mouseX >= 220 && mouseX <= 1280 + 220) {
    if (pmouseX >= 220 && pmouseX <= 1280 + 220) {
      if (mouseY >= 220 && mouseY <= 980 + 220) {
        if (pmouseY >= 220 && pmouseY <= 980 + 220) {
          switch (num_op) {
            case 0:
              op0_erase();
              break;
            case 1:
              op1_pencil();
              break;
            case 3:
              op3_brush();
              break;
            case 4:
              op4_line(start);
              break;
            case 6:
              op6_sq(start);
              break;
            case 7:
              op7_Rsq(start);
              break;
            case 8:
              op8_circle(start);
              break;
            case 9:
              op9_poly(0);
              break;
            case 10:
              op10_spray();
              break;
            case 11:
              op11_text();
              break;
          }
        }
      }
    }
  }
} //opNumber에서 지정된 op[]값 바탕으로 도구기능 함수로 연결

function getColor_atPalette() {
  let x = 415,
    y = 50,
    size = 50,
    palette = [];
  for (let i = 0; i < 32; i++) {
    if (mouseX > x && mouseX < x + size) {
      if (mouseY > y && mouseY < y + size) {
        for (let q = 0; q < 32; q++) {
          palette[q] = 0;
        }
        palette[i] = 1;
      }
    }
    if (i % 2 === 0) y += size + 5;
    else {
      y -= size + 5;
      x += size + 5;
    }
  }
  if (palette.indexOf(1) != -1) c = get(mouseX, mouseY);
} //컬러파레트 클릭시 색상 변화(배열c지정)

function Save_and_reset() {
  let x = 1400,
    y = 40,
    size = 120;
  noStroke();
  for (let i = 0; i < 2; i++) {
    fill(235 - 20 * s_r[i]);
    rect(x, y, size, size);
    x += size + 10;
  }
} //저장과 휴지통 아이콘 바탕 생성

function get_Save_and_reset() {
  let x = 1400,
    y = 40,
    size = 120;
    s_r=[0,0];
  for (let i = 0; i < 2; i++) {
    if (mouseX > x && mouseX < x + size) {
      if (mouseY > y && mouseY < y + size) {
        s_r[i] = 1;
      }
    }
    if (i === 0) x += size + 10;
  }
  if (s_r[0] === 1) main_save();
  if (s_r[1] === 1) main_reset();
} //저장,캔버스 초기화 버튼 클릭 여부 확인 후 배열 s_r[]의 값 지정

function pensizeIcon() {
  let x = 1730;
  let size = 50;
  stroke(0);
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(size_pen, 1817, 100);
  text("-", x + 25, 100);
  text("+", x + size * 3, 100);

  if (keyIsDown(189))
    //마이너스 키코드
    up_down = [1, 0];
  else if (keyIsDown(187))
    //=키코드
    up_down = [0, 1];
  else up_down = [0, 0];
}//우측 상단 펜사이즈 조정시 나오는 숫자/기호 그리기

async function draw_pensizeIcon() {
  let x = 1730,
    y = 70,
    size = 50;
  for (let i = 0; i < 2; i++) {
    noStroke();
    fill(235 - 20 * up_down[i]);
    rect(x, y, size, size);
    x += size * 2.5;
  }
  await delay(300);
}//펜사이즈 조정 아이콘 바탕 생성


//도구기능 함수
function op0_erase() {
  if (mouseIsPressed === true) {
    stroke(255);
    strokeWeight(size_pen * 5);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}//지우개
function op1_pencil() {
  if (mouseIsPressed === true) {
    stroke(c);
    strokeWeight(size_pen);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}//연필
function op2_spoid() {
  if (mouseX > 220) {
    if (mouseIsPressed === true) c = get(mouseX, mouseY);
  }
}//스포이드
function op3_brush() {
  if (mouseIsPressed === true) {
    stroke(c);
    strokeWeight(size_pen * 20);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}//브러시
function op4_line(a) {
  if (a === 0) {
    strokeWeight(size_pen * 2);
    stroke(c);
    line(x1, y1, x2, y2);
    start=1;
  }
}//직선
function op5_Gline(a) {
  if(a===0&&mouseX>220&&mouseY>220){
  noFill();
  strokeWeight(size_pen * 2);
  stroke(c);
  if(g_start===-1){
    cap=get(220, 220, 1280, 980);
    g_start=0;
  }
  if (start === 0&&g_start===0){
  line(x1,y1,x2,y2);
  gx1=x1,gx2=x2,gy1=y1,gy2=y2;
  g_start=1;
}
  else if(g_start===1){
  image(cap,220, 220, 1280, 980);
  bezier(gx1,gy1,pmouseX+50,pmouseY+50,mouseX+50,mouseY+50,gx2,gy2);
  if(mouseIsPressed===false)
  g_start=-1;
}}
if(a===1){
  cap=get(220, 220, 1280, 980);
  g_start=-1;
}
}//곡선: 첫번째 클릭에 직선 그리기, 두번째 클릭에 곡률 조정
function op6_sq(a) {
  if (a === 0) {
    if (x2 - x1 > 5) {
      noFill();
      strokeWeight(size_pen * 2);
      stroke(c);
      rect(x1, y1, x2 - x1, y2 - y1);
    }
    start = 1;
  }
}//사각형
function op7_Rsq(a) {
  if (a === 0) {
    if (x2 - x1 > 5) {
      noFill();
      strokeWeight(size_pen * 2);
      stroke(c);
      rect(
        x1,
        y1,
        x2 - x1,
        y2 - y1,
        (x2 - x1 + y2 - y1) / 20,
        (x2 - x1 + y2 - y1) / 20
      );
      start = 1;
    }
  }
}//둥근사각형
function op8_circle(a) {
  if (a === 0) {
    let a1, a2, cir_w, cir_h;
    cir_w = (x2 - x1) / 2;
    cir_h = (y2 - y1) / 2;
    a1 = x1 + cir_w;
    a2 = y1 + cir_h;
    if (cir_w > 5) {
      noFill();
      strokeWeight(size_pen * 2);
      stroke(c);
      ellipse(a1, a2, cir_w * 2, cir_h * 2);
    }
  }
  start = 1;
}//타원
function op9_poly(a) {
  if (a >= 1) {
    stroke(c);
    strokeWeight(size_pen * 2);
    noFill();
    let i = px.indexOf(0);
    beginShape();
    if (poly < 7) {
      vertex(px[0], py[0]);
      if (i - 6 > 0) vertex(px[i - 6], py[i - 6]);
      if (i - 5 > 0) vertex(px[i - 5], py[i - 5]);
      if (i - 4 > 0) vertex(px[i - 4], py[i - 4]);
      if (i - 3 > 0) vertex(px[i - 3], py[i - 3]);
      if (i - 2 > 0) vertex(px[i - 2], py[i - 2]);
      if (i - 1 > 0) vertex(px[i - 1], py[i - 1]);
    } else {
      vertex(px[0], py[0]);
      vertex(px[1], py[1]);
      vertex(px[2], py[2]);
      vertex(px[3], py[3]);
      vertex(px[4], py[4]);
      vertex(px[5], py[5]);
      vertex(px[6], py[6]);
    }

    endShape(CLOSE);
    poly = 0;
    px.length = 7;
    py.length = 7;
    px = [0, 0, 0, 0, 0, 0, 0];
    py = [0, 0, 0, 0, 0, 0, 0];
    a = 0;
    poly_NumberOfexe++;
  }
}//다각형(vertex): 끝점과 시작점 오차가 10픽셀 이내이거나,7번 이상 클릭했을때 vertex 생성
function op10_spray() {
  let a1 = mouseX;
  let b1 = mouseY;
  let space = 5;
  let num=0;
  if (mouseIsPressed === true) {
    for (let r = size_pen * 20+20; r > 0; r -= space, space++) {
      num=r%2;
      for (let angle = 0+10*num; angle < PI * 2+10*num; angle += space / 10) {
        let x,y;
        
        if(space%2===0){
          x = a1 + r * cos(angle);
        y = b1 + r * sin(angle);
        }
        else{
          x = a1 + r * cos(angle+10);
        y = b1 + r * sin(angle+10);
        }
        stroke(c);
        strokeWeight(1);
        point(x, y);
        point((x+mouseX)/2,(y+mouseY)/2);
      }
    }
  }
}//스프레이 도구
function op11_text(tex) {
  noStroke();
  fill(c);
  textSize(size_pen * 5+20);
  text(tex, x2, y2);
}//텍스트 입력 도구



//저장과 캔버스 초기화 함수
async function main_save() {
  Save_and_reset();
  cap = get(220, 220, 1280, 980);
  save(cap, "save.jpg");
  await delay(150); //연산속도가 빨라 눌렸을때 색상 변화가 보이지 않는 것 같아 delay 추가
  if (mouseIsPressed === false) {
    s_r=[0,0];
    Save_and_reset();
  }
}
async function main_reset() {
  x1 = 0;
  x2 = 0;
  y1 = 0;
  y2 = 0;
  op5_Gline(1);
  op6_sq(1);
  op7_Rsq(1);
  op8_circle(1);
  Save_and_reset();
  background(255);
  await delay(150);
    for (let q = 0; q < 12; q++) {
      op[q] = 0;
    }
    s_r=[0,0];
    Save_and_reset();
  
}

//도구기능 수행 보조 함수
function poly_Getxy(a) {
  let result = 0;
  if (a == 0) {
    if (mouseX >= 220 && mouseX <= 1280 + 220) {
      if (mouseY >= 220 && mouseY <= 980 + 220) {
        if (poly < 7) {
          px[poly] = x2;
          py[poly] = y2;
          if (poly !== 0) {
            if (px[0] - 10 < px[poly] && px[0] + 10 > px[poly]) {
              if (py[0] - 10 < py[poly] && py[0] + 10 > py[poly]) {
                px[poly] = px[0];
                py[poly] = py[0];
                result = 2;
              }
            }
          }

          fill(c);
          ellipse(px[poly], py[poly], size_pen * 2, size_pen * 2);

          if (px[poly] + py[poly] !== 0) poly++;
        } else if (poly >= 7) result = 1;

        op9_poly(result);
      }
    }
  }
}//다각형 그릴 때의 좌표를 배열 px,py에 저장

function text_prompt() {
  if (mouseX >= 220 && mouseX <= 1280 + 220) {
    if (mouseY >= 220 && mouseY <= 980 + 220) {
      let tex = prompt("텍스트를 입력하세요");
      op11_text(tex);
    }
  }
}//텍스트 입력창 생성

//반응함수
function keyPressed() {
  switch (key) {
    case "`":
      op = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      break;
    case "1":
      size_pen = 1;
      break;
    case "2":
      size_pen = 2;
      break;
    case "3":
      size_pen = 3;
      break;
    case "4":
      size_pen = 4;
      break;
    case "5":
      size_pen = 5;
      break;
    case "6":
      size_pen = 6;
      break;
    case "7":
      size_pen = 7;
      break;
    case "8":
      size_pen = 8;
      break;
    case "9":
      size_pen = 9;
      break;
    case "0":
      size_pen = 10;
      break;
    case "-":
      if (size_pen > 1) size_pen--;
      break;
    case "=":
      if (size_pen < 10) size_pen++;
      break;
  }
  if (size_pen > 10) size_pen = 10;
  if (key === "d") {
    s_r = [0, 1];
    main_reset();
  }

  if (key === "s") {
    s_r = [1, 0];
    main_save();
  }
}
function mousePressed() {
  prevX = mouseX; // 초기 마우스값 저장
  prevY = mouseY;
  x1 = mouseX;
  y1 = mouseY;
  x2 = mouseX;
  y2 = mouseY;
}

function mouseClicked() {
  start = 0;
  get_opNumber();
  if (mouseX > 1400 && mouseY < 200) get_Save_and_reset();
  if (op[2] === 0) getColor_atPalette();
  if (mouseY >= 160) {
    x2 = mouseX;
    y2 = mouseY;
  }

  if (op[9] === 1) {
    if (poly_NumberOfexe == 0) {
      poly_Getxy(0);
    } else {
      poly_NumberOfexe--;
    }
  }
  if(op[5]===1){
    op5_Gline(0);
  }

  if (op[11] === 1) {
    text_prompt();
  }
}


function mouseReleased() {
  return false;
}
//기타함수
function delay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
} //main_save와 main_reset등 아이콘 바탕 표시 함수 딜레이하는데에 사용됨
