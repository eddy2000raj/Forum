import { Component,ViewChild, ElementRef ,OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'Forum';
  posts=[];
  postData: string;

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('search') search: ElementRef;

  ngOnInit() {
  	if(localStorage.getItem("posts"))
  	this.posts=JSON.parse(localStorage.getItem("posts"));
  }

  serachText(){

   let text=this.search.nativeElement.value ;
   let searchedPost={};
   
   if(text.length>0){

     for(let i=0;i<this.posts.length;i++){
      let post=this.posts[i]['postData'] ;
      
      if(post.indexOf(text)>-1){
        searchedPost=this.posts[i];
        }
     }

     this.posts=[];
     this.posts[0]=searchedPost;

   }else{
    if(localStorage.getItem("posts"))
    this.posts=JSON.parse(localStorage.getItem("posts"));
   }
   

  }



  addPost(){
    //alert('clicked');
    console.log('player name: ', this.nameInput.nativeElement.value);
    let newPost={
    	postData:this.nameInput.nativeElement.value,
    	email:"john@Due",
    	timestamp:new Date().getMilliseconds(),
    	like:3,
    	comments:[]
    };


   this.posts.push(newPost);
   localStorage.setItem('posts',JSON.stringify(this.posts));
   this.nameInput.nativeElement.value="";

  }
}
