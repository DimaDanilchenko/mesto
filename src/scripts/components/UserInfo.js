export default class UserInfo {
  constructor(profileTitle, profileSubtitle, profileAvatar) {
    this.userName = document.querySelector(profileTitle);
    this.userInfo = document.querySelector(profileSubtitle);
    this.userAvatar = document.querySelector(profileAvatar);
  }
  getUserInfo(){
    return{
      name: this.userName.textContent,
      about: this.userInfo.textContent,
    }
  }
  setUserInfo(data){
    this.userName.textContent = data.name;
    this.userInfo.textContent = data.about;
    this.userAvatar.src = data.avatar;
    this.userAvatar.name = data.name;
  }
}
