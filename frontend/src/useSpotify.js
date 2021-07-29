import { useState, useEffect } from "react";
import axios from "axios";

export default function useSpotify(code) {

  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {

    axios.post("/login", {
        code,
      }).then(res => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState(null, null, "/")
      }).catch((err) => {
        console.log(err)
      });

  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return

    const interval = setInterval(() => {
      axios.post("/refresh", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch((err) => {
          console.log({error: err})
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)

  }, [refreshToken, expiresIn])

  return accessToken;
}