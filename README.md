재미삼아 만들어본 클로바 얼굴인식 입니다.

파일 선택 후 인식하기를 누르면 /public/images 폴더에 저장되고, ejs 뷰가 보여집니다.

단지 제 얼굴 인식해보고 싶었던 프로젝트이기에 만약에 사용하고 싶으시면 무조건 가다듬어야 합니다.

쓰레기코드가 너무 많습니다...

index.ejs 에서 

for(let i in a.faces) {
      result += '<div>닮은 유명인 : ' + a.faces[i].celebrity.value + '</div>'
      result += '<div>정확도 : ' + (a.faces[i].celebrity.confidence)*100 + '%</div><br>'
    }
    
이부분은 닮은 유명인이 여러명 나올줄 알고 썼는데 계속 한명밖에 안나오더라구요.ㅋㅋ

##간단 사용법

npm install
->
public 폴더에 images 폴더 생성
->
index.js 에 클라이언트 아이디, 시크릿 아이디 수정(네이버 개발자센터 참조)
->
npm start
