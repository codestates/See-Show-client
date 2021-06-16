import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const SignUp = () => {
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소

  const [isOpenPost, setIsOpenPost] = useState(false);

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddress);
    setIsOpenPost(false);
  };

  const postCodeStyle = {
    display: "block",
    position: "relative",
    top: "0%",
    width: "400px",
    height: "400px",
    padding: "7px",
  };

  return (
    <>
      {isOpenPost ? (
        <DaumPostcode
          style={postCodeStyle}
          autoClose
          onComplete={onCompletePost}
        />
      ) : null}
    </>
  );
};

export default SignUp;
