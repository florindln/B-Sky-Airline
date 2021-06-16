import React, { useEffect, useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import CardDataService from '../../services/CardDataService'


function Cards() {

  
  const [addresses, setaddresses] = useState()
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    CardDataService.getRandomAddresses().then((res)=>{
      setaddresses(res.data)
      setisLoading(false);
    })
    
    
  }, [])

  return ( !isLoading&&(
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <div className='cards__container'>
        {/* <div className='cards__wrapper'> */}
          <div className='cards__items'>
{/* 
            { addresses&&
              addresses.map((address)=>(
                <CardItem key={address.id}
                
                text={"City of "+address.city+" - "+address.community}
                label={address.country}
                />
              ))
            } */}
            
           { <CardItem
              src="https://loremflickr.com/1000/1000/singapore"
              text={"City of "+addresses[0].city+" - "+addresses[0].community}
              label={addresses[0].country}
              path={'https://www.google.ro/search?q='+addresses[0].city+"+"+addresses[0].community}
            />}
            <CardItem
              src="https://loremflickr.com/900/900/romania"
              text={"City of "+addresses[1].city+" - "+addresses[1].community}
              label={addresses[1].country}
              path={'https://www.google.ro/search?q='+addresses[1].city+"+"+addresses[0].community}
            />
          
            <CardItem
              src="https://loremflickr.com/800/800/brazil"
              text={"City of "+addresses[2].city+" - "+addresses[2].community}
              label={addresses[2].country}
              path={'https://www.google.ro/search?q='+addresses[2].city+"+"+addresses[0].community}
            />
            </div>
            <div className='cards__items'>
            <CardItem
              src="https://loremflickr.com/700/700/netherlands"
              text={"City of "+addresses[3].city+" - "+addresses[3].community}
              label={addresses[3].country}
              path={'https://www.google.ro/search?q='+addresses[3].city+"+"+addresses[3].community}
            />
            <CardItem
              src="https://loremflickr.com/600/600/belgium"
              text={"City of "+addresses[4].city+" - "+addresses[4].community}
              label={addresses[4].country}
              path={'https://www.google.ro/search?q='+addresses[4].city+"+"+addresses[4].community}
            />
          </div>
        {/* </div> */}
      </div>
    </div>
  )
  );
}

export default Cards;