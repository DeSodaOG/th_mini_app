"use client";

import { Button, Modal } from "flowbite-react";
import { FC, ReactNode } from "react"
import { initUtils } from '@tma.js/sdk';
import { useInitData } from "@telegram-apps/sdk-react";
import { en_locationText, ru_locationText } from "@/assets/location";

interface Val {
  tgID: string,
  openModal: boolean,
  setOpenModal: any,
}

export const ShareLinkModal: FC<Val> = ({ tgID, openModal, setOpenModal }): ReactNode => {
  const initData = useInitData();
  const local = initData?.user?.languageCode === 'ru' || initData?.user?.languageCode === 'be' || initData?.user?.languageCode === 'uk' ? ru_locationText : en_locationText;

  const shareLink = `https://t.me/share/url?url=https%3A%2F%2Ft.me%2FTeleHunterBot%2Fthapp%3Fstartapp%3D${tgID}&text=${local.share.shareText}`;
  //bg-gradient-to-r from-purple-950 to-pink-950
  return <div>
    
    <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)} popup position="center" className="bg-black" >
      <Modal.Header className="bg-gray-600"></Modal.Header>
      {/* <Modal.Header className="bg-gray-800" /> */}
      <Modal.Body className="bg-gray-800">
        <div className="space-y-6 p-6 text-center">
          <p className="text-base leading-relaxed text-gray-100">
            {local.share.title}
          </p>
          <div className='flex flex-col justify-center p-5 text-xl w-full'>
            <Button gradientDuoTone="purpleToPink" className="items-center my-5"
              onClick={() =>  {
                navigator.clipboard.writeText(shareLink)
                alert(local.share.success)
              }}
            >{local.share.copy}</Button>
            <Button gradientDuoTone="pinkToOrange" className="items-center my-5" onClick={() => {
              const utils = initUtils();
              utils.openTelegramLink(
                shareLink
              );
            }}>{local.share.invite}</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </div>
  
};
