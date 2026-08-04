'use client';

import { useEffect, useState } from "react";

export default function WtaPage() {

  const [loadSlider, setLoadSlider] = useState(false);

  const loadLiveLikeSdk = async () => {
    const LiveLike = await import("@livelike/widget-elements");
    // await LiveLike.LiveLikeInit({ clientId: '9MxRnhmq0Wkv89ESZciLBNY8ttjKce3VkSj8Te4G', accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3ODM1MTQ1OTgsImNsaWVudF9pZCI6IjlNeFJuaG1xMFdrdjg5RVNaY2lMQk5ZOHR0aktjZTNWa1NqOFRlNEciLCJpc3MiOiJibGFzdHJ0IiwiYWNjZXNzX3Rva2VuIjoiNzMxN2I4MzU3OTMzNjg0ODlhNTdjZDRmMGQzNjcwNmMxZGIwZDJjMyIsImlkIjoiZTI4NzgwODQtNjAwYS00YWRiLWFjMjItNTEyMDg4MDliZGQyIn0.r_hIAR2hl5s1mJYCRk2c0wg4Dmkbd2Jzo6vydte7G2Q" });
    await LiveLike.LiveLikeInit({ clientId: '9MxRnhmq0Wkv89ESZciLBNY8ttjKce3VkSj8Te4G' });
    setLoadSlider(true);
  }

  useEffect(() => {
    loadLiveLikeSdk().then(() => {
      setLoadSlider(true);
    });
  }, []);

  return (
    loadSlider ?
      <div>
       <text-poll widgetid="e09cfc59-6ddf-4b4e-963d-2d533c23be3c"></text-poll>
       <text-poll widgetid="523155d6-77d4-4623-b7ac-394d8e98d27a"> </text-poll>
       <text-poll widgetid="cdc2e8c7-5a48-4735-b7ea-6c2fbbf6f81d"> </text-poll>
       <image-prediction widgetid="7207a017-94d0-46fb-a3f6-deda17263d93"></image-prediction>
       <image-prediction widgetid="1de40c49-c9c1-4e1f-a2b0-67007a8054d6"></image-prediction>
       <image-poll widgetid="f6c1c295-f4c1-49fd-868b-d33c68864e7b"></image-poll>
       <image-quiz widgetid="30c0aa0a-fb8c-4e55-9034-7208254d9e2e"></image-quiz>
       <text-quiz widgetid="69cb5699-a437-4730-bdb9-112b7d90bf23"></text-quiz>
       <text-prediction widgetid="9ec0edba-4fdd-4db2-99ff-f00ccdf554c6"></text-prediction>
       <text-prediction widgetid="9ec0edba-4fdd-4db2-99ff-f00ccdf55"></text-prediction>
       <emoji-slider widgetid="b6dddb27-ec68-4ae8-8f95-b8eee9ab87f8"></emoji-slider>
       <text-ask widgetid="35efdbcc-5c93-4cc5-9d95-70291b43d1b2"></text-ask>
       <cheer-meter widgetid="5284325c-5801-4ee4-9acd-5fa9403779e1"></cheer-meter>
       <image-poll widgetid="3c9376ec-9288-4756-a844-e88faec30308"></image-poll>
       <text-poll widgetid="3c9376ec-9288-4756-a844-e88faec30308"></text-poll>
       
      </div>
      : <p>Loading...</p>
  );
}