import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

const apikey = "AIzaSyAgiyfgxKeZC3vtHrYfCsV4cFR2L4obPQk"

const TenorSearch = () => {
    const [gifData, setGifData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("excited")

    const fetchData = async () => {
        let lmt = 10

        let search_term = searchTerm;

        let search_url = `https://tenor.googleapis.com/v2/search?q=${search_term}&key=${apikey}&limit=${lmt}`

        await axios.get(search_url)
            .then(res => {
            console.log(res.data)
            setGifData(res.data)
          })
          .catch(err => console.log(err))
        
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSearch = (e) => {
        console.log(e.target.value)
        setSearchTerm(e.target.value)
        fetchData();
    }

    // console.log(gi)
    if(gifData != null) {
        return (
            <div className="m-50">
                <form>
                <label for="search">Search Term</label>
                <input type="text" placeholder="Tenor Search" className="input" onChange={handleSearch} />
    
                </form>
                <div>
                    <p>hello</p>
                </div>
    
                <div class="grid md:grid-cols-5 gap-0">
                {/* {console.log(gifData.results[0].media_formats.tinygif.url)} */}
                {gifData.results.map((gif) => {
                    return (
                        <img src={gif.media_formats.tinygif.url} />
                    )
                })}
                </div>
            </div>
        )
    }
    

}

export default TenorSearch;