
import React, {useState} from 'react';

type imagePayload = {
  name: string,
  clickCount: number
}

let newIndex : Array<number> = [];

const ImageGallery : React.FC = () => {
  
  const defaultOrder = [0,1,2,3,4,5,6,7]
  const [image0Click, setImage0Click] = useState(0);
  const [image1Click, setImage1Click] = useState(0);
  const [image2Click, setImage2Click] = useState(0);
  const [image3Click, setImage3Click] = useState(0);
  const [image4Click, setImage4Click] = useState(0);
  const [image5Click, setImage5Click] = useState(0);
  const [image6Click, setImage6Click] = useState(0);
  const [image7Click, setImage7Click] = useState(0);

  const clickCountArray: Array<imagePayload> = [
    {name: 'image0', clickCount: image0Click}, 
    {name: 'image1', clickCount: image1Click},
    {name: 'image2', clickCount: image2Click},
    {name: 'image3', clickCount: image3Click},
    {name: 'image4', clickCount: image4Click},
    {name: 'image5', clickCount: image5Click},
    {name: 'image6', clickCount: image6Click},
    {name: 'image7', clickCount: image7Click}
  ]
  /* Comment 1 
  please see comment # 5 below why I did not call setOrder 
  */
  const [imageOrder, setOrder] = useState(  JSON.parse(localStorage.getItem("order") as string) || defaultOrder)
  const [graphOrder, setGraphOrder] = useState(clickCountArray);

  const onClick =  (e : React.MouseEvent) => {
    const target = e.target as HTMLElement
    updateClickCount(target);
    updateOrder(target);
  }

  const updateClickCount = (target : HTMLElement): void => {
    /* Comment 2
    I'm not thrilled with the idea of using having so many different state click counts, but since they both rely on the click on the single page
    setting up multiple components and passing it in as props looks weird in the map. And setting up an entire context and use context hook and passing it back and forth seemed strange
    for such a small project too. This seemed like the path of least resistance. 
    */
    switch(Number(target.id)) {
      case 0:
      updateClickState(0, setImage0Click);
      break;
      case 1:
      updateClickState(1, setImage1Click);  
      break;
      case 2:
      updateClickState(2, setImage2Click);  
      break;
      case 3:
      updateClickState(3, setImage3Click);  
      break;
      case 4:
      updateClickState(4, setImage4Click);  
      break;
      case 5:
      updateClickState(5, setImage5Click);  
      break;
      case 6:
      updateClickState(6, setImage6Click);  
      break;
      case 7:
      updateClickState(7, setImage7Click);
    }

    clickCountArray.sort((a,b) => a.clickCount > b.clickCount ? -1 : 1)
    setGraphOrder(clickCountArray)
  }

  const updateClickState = ((target: number, updateClick : Function) : void => {
    const count = clickCountArray[target].clickCount += 1;
    updateClick(count);
  })

  const updateOrder =(target : HTMLElement): void => {
    /* Comment 3
    We're first checking to make sure the clicked target isn't in the index already, 
    this makes it a lot easier to make sure the initial array stays the same size as index array
    Though it wasn't a requirement for this project, I wanted to make sure the method worked for both
    live reloads using state, and for page refreshes. So instead of creating an index array and converting
    it to a set like we did below, we just don't add it if it's already there.
    */
    if (newIndex.indexOf(parseInt(target.id)) === -1) {
        newIndex.unshift(parseInt(target.id))
    }
    
    const newArraySet = new Set([...newIndex, ...imageOrder])
    const newOrderArray = Array.from(newArraySet);
    localStorage.setItem("order", JSON.stringify(newOrderArray))
    /*Comment 4
    This caused problems with the live reload where the array didn't reset sizes with a full array of temporary indexes
    This makes sure we can continously flow through state resets, as the array resets itself. */
    if (newIndex.length === 8) {
      newIndex = [];
    }
    /* Comment 5
    this is where I should be calling setOrder hook to update my application state in real time
    however the coding assessment instructions indicated that this should only be done on
    page reload. So I'm leaving it commented out. Uncomment it to see live update of the image grid
    it is bad practice to not call setOrder and I leave this comment only to justify why
    I did not. I feel that not silencing the warning is best to not cause confusion with this comment
    */
    //setOrder(newOrderArray);
  }
  
  
  return (
    <div>
      <div className="imageGallery">
        <div className ="imageContainer">
        {imageOrder.map((item : Number, index: React.Key) => {
          return (
            <div key={index} className="mockImage">
              <img id={item.toString()} src={`https://via.placeholder.com/100?text=image${item.toString()}`} alt="product" onClick={((e) => onClick(e))}/>
            </div>
          )
        })}
        </div>
      </div>
      <div className="imageStats">
      <table>
        <tbody>
        <tr>
          <th>'Picture Name'</th>
          <th>'Click Count'</th> 
        </tr>
        {graphOrder.map((item: imagePayload, index) => {
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.clickCount}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default ImageGallery