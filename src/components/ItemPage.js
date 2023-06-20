  function UserRating()
  {
    //switch case
    return <form class="rating2">
      <label>
        <input type="radio" name="stars" value="1" />
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="stars" value="2" />
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="stars" value="3" />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>   
      </label>
      <label>
        <input type="radio" name="stars" value="4" />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="stars" value="5" />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
    </form>
  }
  function updateuserRating()
  {
    const docRef = doc(db, "restaurant", props.description,"items",props.name);
    const data = {
      // fname: fname,
      totalRating:p.totalRating+rate,
      usersRated:p.usersRated+1,
      review:Math.round((p.totalRating+rate)/(p.usersRated+1))
    };
    updateDoc(docRef, data)
    .then(docRef => {
        console.log("A New First name Field has been added ");
    })
    .catch(error => {
        console.log(error);
    })
  }
    function generateString(length) {
      let result = '';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }
