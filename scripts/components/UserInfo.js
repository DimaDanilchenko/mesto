export default class UserInfo {
  constructor(profileTitle, profileSubtitle) {
    this.userName = document.querySelector(profileTitle);
    this.userInfo = document.querySelector(profileSubtitle);
  }
  getUserInfo(){
    return{
      name: this.userName.textContent,
      about: this.userInfo.textContent,
    }
  }
  setUserInfo({name, about}){
    this.userName.textContent = name;
    this.userInfo.textContent = about;
  }
}
