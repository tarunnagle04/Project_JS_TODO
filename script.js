const taskList = [];
const itemLists = {}
let selectedItemId = "";
let count = 0;
let isInside = false;
if(taskList.length ===0){
    const paragraph = document.createElement("p");
    paragraph.style.color = "white";
    paragraph.innerText = " No items in the todo list";
    const parent = document.getElementById("parent")
    parent.style.justifyContent = "left";
    parent.style.fontSize = "30px";
    parent.style.marginLeft="40px";
    parent.appendChild(paragraph);
}


const addTask =() =>{
    const name = document.getElementById('name').value;
    
    if(taskList.length === 0){
        const parent= document.getElementById("parent");
        parent.style.justifyContent = "space-around";
        parent.removeChild(parent.children[0])
    }

    const tempObj = {
        id: Date.now(),
        taskname : name
    }
    
    taskList.push(tempObj);
        // console.log(taskList);
        
    addTaskonscreen();
    document.getElementById("qw").style.visibility = "hidden"
    
}

const closeTask =() =>{
    document.getElementById("qw").style.visibility = "hidden"
}

function openNextPage(){
    document.getElementById("root__id").style.visibility = "hidden"
    document.getElementById("qw").style.visibility = "visible"
}
    
    
function addTaskonscreen(){
    const element = document.createElement('div');
    const id = taskList.slice(-1)[0].id;
    element.id = id;
    element.setAttribute('class', 'child')   
    
    const textDiv = document.createElement("div");
    textDiv.style.display = "flex";
    textDiv.style.justifyContent = "center";
    textDiv.style.alignItems = "center";
    textDiv.style.borderBottom = "1px solid gray";
    textDiv.style.backgroundColor = "White";
    textDiv.style.borderTopLeftRadius = "10px";
    textDiv.style.TopRightRadius = "10px";
    textDiv.style.width = "100%";
    textDiv.style.height = "60px";
    textDiv.style.fontSize = "24px";
    textDiv.style.color = "brown"
    const newObj = {...taskList[taskList.length-1]}
    textDiv.addEventListener('click',(e) => openItemDetails(e,newObj));

    textDiv.innerText = taskList[taskList.length-1].taskname;

    const itemListDiv = document.createElement("div");
    itemListDiv.style.width = "100%";
    itemListDiv.style.minHeight = "230px";
    itemListDiv.style.height = "fit-content"


    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.width = "100%";
    buttonContainer.style.minHeight = "40px";
    buttonContainer.style.height = "fit-content";
    buttonContainer.style.justifyContent = "flex-end";
    buttonContainer.style.alignItems = "end";
    buttonContainer.style.backgroundColor = "white";
    buttonContainer.style.borderBottomLeftRadius = "10px";
    buttonContainer.style.borderBottomRightRadius = "10px";
    buttonContainer.style.marginTop = "20px"
    
    const addImage = document.createElement("img");
    addImage.src="add-icon.png";
    addImage.setAttribute('class','addImage')
    addImage.addEventListener('click',(e) => {
        selectedItemId = id;
        addItemInTodo(e,selectedItemId);
    });
   

    const deleteImage = document.createElement("img");
    deleteImage.src="delete-icon.jpg";
    deleteImage.setAttribute('class','addImage')
    deleteImage.addEventListener('click',(e) => deleteTodoHandler(e,id));

    buttonContainer.appendChild(deleteImage);
    buttonContainer.appendChild(addImage);
    
    element.appendChild(textDiv);
    element.appendChild(itemListDiv);
    element.appendChild(buttonContainer);

    const existingElement = document.getElementById('parent');
    existingElement.appendChild(element);

    
}
    
    const deleteTodoHandler = (e,id) =>{
        let indexTobeDeleted = 0;
        let parent = document.getElementById("parent")
        const children = parent.childNodes.forEach((value,i) => {if(value.id.toString() === id.toString()) {
indexTobeDeleted = i;
        }});

        parent.removeChild(parent.children[indexTobeDeleted]);
        taskList.splice(indexTobeDeleted,1);
        if(taskList.length ===0){
            const paragraph = document.createElement("p");
            paragraph.style.color = "white";
            paragraph.innerText = " No items in the todo list";
            const parent = document.getElementById("parent")
            parent.style.justifyContent = "left";
            parent.style.fontSize = "30px";
            parent.style.marginLeft="40px";
            parent.appendChild(paragraph);
            document.getElementById("root__id").style.visibility = "hidden"
        }

        delete itemLists[id];
        document.getElementById("root__id").style.visibility = "hidden"

    }
    const addItemInTodo = (e,id,isvalid) =>{
        document.getElementById("open__item__page").style.visibility = "visible"
        if(isvalid){
            isInside = true;
        }
    }

    const addItem = () =>{
     
        let indexTobeDeleted = 0;

        let parent = document.getElementById("parent")
       parent.childNodes.forEach((value,i) => {if(value.id.toString() === selectedItemId.toString()) {
indexTobeDeleted = i;
        }});

     let item__name = document.getElementById("item_name").value;  
        if(itemLists[selectedItemId]){
            itemLists[selectedItemId][item__name] = 0
        }else{
            itemLists[selectedItemId] = {
                [item__name] : 0
            }
        }
  

        const itemDiv = document.createElement("div");
        const textSpan = document.createElement("span");
        const statusSpan = document.createElement("span");
        let length = (document.getElementById("item").children[1]?.children?.length + 1) || 1;
        let itemListDivId = selectedItemId + "itemDiv" + length+ "clone";
       
        itemDiv.id = itemListDivId;
        itemDiv.style.marginTop = "10px"

        textSpan.innerText = item__name;
        textSpan.style.fontSize = "20px";
        textSpan.style.margin = "10px";

        statusSpan.innerText = "Mark Done";
        statusSpan.style.backgroundColor = "#0b8bd9"
        statusSpan.style.fontSize = "10px"
        statusSpan.style.color=  "white"
        statusSpan.style.padding = "5px"
        statusSpan.style.borderRadius = "10px"
        let selectedId = selectedItemId;
        statusSpan.addEventListener('click', (e) => markAsDoneHandler(e,itemListDivId,selectedId ,item__name))


        itemDiv.appendChild(textSpan);
        itemDiv.appendChild(statusSpan);
        if(isInside){
            document.getElementById("item").children[1].appendChild(itemDiv);
        }

        const itemdivCloneNode = itemDiv.cloneNode();
        let cloneLength = (document.getElementById("parent").children[indexTobeDeleted]?.children[1]?.children?.length + 1) || 1;
        let newId = selectedItemId + "itemDiv" + cloneLength;
        itemdivCloneNode.id = newId;
       
        const textSpanCloneNode = textSpan.cloneNode();
        textSpanCloneNode.innerText = item__name;
       
        const statusSpanCloneNode = statusSpan.cloneNode();
        statusSpanCloneNode.innerText = "Mark Done"
        statusSpanCloneNode.addEventListener('click', (e) => markAsDoneHandler(e,newId,selectedId,item__name))
        itemdivCloneNode.appendChild(textSpanCloneNode);
        itemdivCloneNode.appendChild(statusSpanCloneNode);
       
        parent.children[indexTobeDeleted].children[1].appendChild(itemdivCloneNode);
        count++;
        document.getElementById("open__item__page").style.visibility = "hidden"

    }

    const markAsDoneHandler = (e,id,parentId,name) =>{
        if(isInside){
            if(id.includes("clone")){
                let withOutcloneId = id.split("clone")[0];
                const parent = document.getElementById(withOutcloneId);
                parent.removeChild(parent.children[1]);
                const textSpan = parent.childNodes[0];
                textSpan.style.textDecoration = "line-through";
                textSpan.style.textDecorationColor = "red";
                textSpan.style.color = "red";
            }
        }
        const parent = document.getElementById(id);
        parent.removeChild(parent.children[1]);
        const textSpan = parent.childNodes[0];
        textSpan.style.textDecoration = "line-through";
        textSpan.style.textDecorationColor = "red";
        textSpan.style.color = "red";
        itemLists[parentId][name] = 1;

    }

    const closeItem = () =>{
        document.getElementById("open__item__page").style.visibility ="hidden"
    }

    const openItemDetails = (e,obj) =>{ 
        isInside=  true;
        document.getElementById("root__id").style.visibility = "visible"
        const root = document.getElementById("root__id");
        root.childNodes[1].childNodes[3].innerHTML = obj.taskname;

        const element = document.getElementById('item');
        element.innerHTML = "";
       
    
     
        const textDiv = document.createElement("div");
        textDiv.style.display = "flex";
        textDiv.style.justifyContent = "center";
        textDiv.style.alignItems = "center";
        textDiv.style.borderBottom = "1px solid gray";
        textDiv.style.backgroundColor = "White";
        textDiv.style.borderTopLeftRadius = "10px";
        textDiv.style.TopRightRadius = "10px";
        textDiv.style.width = "100%";
        textDiv.style.height = "60px";
        textDiv.style.fontSize = "24px";
        textDiv.style.color = "brown"
    
        textDiv.innerText = obj.taskname;
    
        const itemListDiv = document.createElement("div");
        itemListDiv.style.width = "100%";
        itemListDiv.style.minHeight = "230px";
        itemListDiv.style.height = "fit-content"
    
    
        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.width = "100%";
        buttonContainer.style.minHeight = "40px";
        buttonContainer.style.height = "fit-content";
        buttonContainer.style.justifyContent = "flex-end";
        buttonContainer.style.alignItems = "end";
        buttonContainer.style.backgroundColor = "white";
        buttonContainer.style.borderBottomLeftRadius = "10px";
        buttonContainer.style.borderBottomRightRadius = "10px";
        buttonContainer.style.marginTop = "20px"
        


        const addImage = document.createElement("img");
        addImage.src="add-icon.png";
        addImage.setAttribute('class','addImage')
        addImage.addEventListener('click',(e) => {
            selectedItemId = obj.id;
            addItemInTodo(e,selectedItemId,true);
        });
       
    
        const deleteImage = document.createElement("img");
        deleteImage.src="delete-icon.jpg";
        deleteImage.setAttribute('class','addImage')
        deleteImage.addEventListener('click',(e) => deleteTodoHandler(e,obj.id));
    
        buttonContainer.appendChild(deleteImage);
        buttonContainer.appendChild(addImage);
        
        element.appendChild(textDiv);
        element.appendChild(itemListDiv);
        element.appendChild(buttonContainer);

     
if(obj && obj?.id && itemLists && itemLists[obj?.id] &&  Object.entries(itemLists[obj.id])?.length > 0){
       Object.entries(itemLists[obj.id]).forEach((value,index) =>{
            const itemDiv = document.createElement("div");
            const textSpan = document.createElement("span");
            const statusSpan = document.createElement("span");
            let itemListDivId = selectedItemId + "itemDiv" + (index + 1) + "clone";
            count++;
            itemDiv.id = itemListDivId;
            itemDiv.style.marginTop = "10px"
    
            textSpan.innerText = value[0]
            textSpan.style.fontSize = "20px";
            textSpan.style.margin = "10px";
            if(value[1] === 1){
                textSpan.style.textDecoration = "line-through";
        textSpan.style.textDecorationColor = "red";
        textSpan.style.color = "red"
            }
            itemDiv.appendChild(textSpan);
    
            if(value[1] === 0){
                statusSpan.innerText = "Mark Done";
                statusSpan.style.backgroundColor = "#0b8bd9"
                statusSpan.style.fontSize = "10px"
                statusSpan.style.color=  "white"
                statusSpan.style.padding = "5px"
                statusSpan.style.borderRadius = "10px"
                statusSpan.addEventListener('click', (e) => markAsDoneHandler(e,itemListDivId,selectedItemId,value[0]))
                itemDiv.appendChild(statusSpan);
            }
          
            itemListDiv.appendChild(itemDiv);
   
        })
}
    }
    const backButton = () =>{
        isInside=  false;
        document.getElementById("root__id").style.visibility = "hidden"
    }
