import axios from "axios";
    

class CardDataService  {
    async getRandomAddresses() {
        try {
          const data = await axios.get("https://random-data-api.com/api/address/random_address?size=5");
          return data;
        } catch(err) {
          console.log("error: ", err);
        }
    }
}
 
export default new CardDataService();

