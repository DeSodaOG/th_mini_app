"use client";

import { Button, Modal } from "flowbite-react";
import { FC, ReactNode } from "react"
import { initUtils } from '@tma.js/sdk';

interface Val {
  tgID: string,
  openModal: boolean,
  setOpenModal: any,
}

export const ShareLinkModal: FC<Val> = ({ tgID, openModal, setOpenModal }): ReactNode => {

  const shareLink = `https://t.me/share/url?url=https%3A%2F%2Ft.me%2FTeleHunterBot%2Fthapp%3Fstartapp%3D${tgID}&text=Farm%20%24Hunter%2C%20earn%20%24USDT%20with%20me%20and%20secure%20your%20token%20allocation%20through%20%40TeleHunterBot%21%20%0A%F0%9F%8E%81%20I%27ve%20prepared%20a%20warm%20welcome%20gift%20just%20for%20you%21%F0%9F%8E%81%20%0ABuild%20your%20Telegram%20traffic%20affiliate%20system%20and%20earn%20passive%20income%20permanently%20with%20TeleHunter.%0A`;
  //bg-gradient-to-r from-purple-950 to-pink-950
  return <div>
    
    <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)} popup position="center" className="bg-black" >
      <Modal.Header className="bg-gray-600"></Modal.Header>
      {/* <Modal.Header className="bg-gray-800" /> */}
      <Modal.Body className="bg-gray-800">
        <div className="space-y-6 p-6 text-center">
          <p className="text-base leading-relaxed text-gray-100">
            Optimize your affiliates system to earn more score
          </p>
          <div className='flex flex-col justify-center p-5 text-xl w-full'>
            <Button gradientDuoTone="purpleToPink" className="items-center my-5"
              onClick={() =>  {
                navigator.clipboard.writeText(shareLink)
                alert('Copy Success!')
              }}
            >Copy the share link</Button>
            <Button gradientDuoTone="pinkToOrange" className="items-center my-5" onClick={() => {
              const utils = initUtils();
              utils.openTelegramLink(
                shareLink
              );
            }}>Invite More</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </div>
  
};
