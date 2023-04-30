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
  setUserInfo(data){
    console.log(data);
    this.userName.textContent = data.popupName;
    this.userInfo.textContent = data.popupJob;
  }
}
