import "../static/profilescreen.css"
import ProfilePage from "../components/profiepagecomponent/profilepage"
import Header from "../components/navbarcomponent/header"

function ProfileScreen(){
  return (
    <div className="app1">
        <Header />
      <ProfilePage />
    </div>
  )
}

export default ProfileScreen

