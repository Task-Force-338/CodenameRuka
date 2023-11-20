import React, {useEffect} from "react";
import { database } from "@/firebase";
import { ref, onValue, child, get } from "firebase/database";
import { Detail, Navbar, Task } from "@/components";
import { useCookies } from "react-cookie";

enum Priority {
  Low,
  Medium,
  High,
}

const Index = () => {

  let user = {};
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  
  function isLoggedIn() {
  if (cookies.user) {
    user = cookies.user
    console.log(user)
    return true
  } else {
    console.log("not logged in")
  }
}
  
  let tasks = {}

  function theRest(){
  const reference = ref(database);
  get(child(reference, `users/${user.uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      tasks = snapshot.val()
      console.log(tasks)
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  }

  function initTaskBoard(uid: string) {
    for (const [key, value] of Object.entries(tasks)) {
      console.log(`${key}: ${value}`);

      // populate tasklists
      const tasklists = document.getElementById("tasklists");
      const task = document.createElement("div");
      task.className = "bg-neutral-400 w-full h-auto rounded-lg border-2 border-[#c29b4a] p-2 flex flex-col gap-1 max-h-56";
      tasklists?.appendChild(task);
      
    }

    //


  }


  return (
    <>
      {isLoggedIn()}
      {theRest()}
      <Navbar />
      <div className="flex">
        <div className="w-1/3 bg-neutral-300 grid grid-flow-row gap-4 p-4" id="tasklists">
          <Task
            title="Card 1"
            description="Card 1 Description"
            dueDate={new Date()}
            isCompleted={true}
            isFailed={true}
          />
          <Task
            title="Card 2"
            description="Card 2 Description"
            dueDate={new Date()}
            isCompleted={true}
            isFailed={false}
          />
          <Task
            title="Card 3"
            description="Card 2 Description"
            dueDate={new Date()}
            isCompleted={false}
            isFailed={false}
          />
        </div>
        <div className="w-2/3 bg-[#717274] p-2">
          <Detail
            title="Card 1"
            dueDate={new Date()}
            shortDescription="Card 1 Short Description"
            description="Card 1 Description"
            priority={Priority.Low}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
