"use client";

import { Button, Modal } from "flowbite-react";
import { FC, ReactNode } from "react"

interface Val {
  tgID: string,
  openModal: boolean,
  setOpenModal: any,
}

export const ShareLinkModal: FC<Val> = ({ tgID, openModal, setOpenModal }): ReactNode => {

  const shareLink = `https://t.me/share/url?url=https://t.me/TeleHunterBot/thapp?startapp=${tgID}&text=This%20is%20a%20test%20%F0%9F%98%88link%20`;
  //bg-gradient-to-r from-purple-950 to-pink-950
  return <div>
    
    <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)} popup position="center" className="bg-black" >
      <Modal.Header className="bg-gray-800" />
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
            <Button gradientDuoTone="pinkToOrange" className="items-center my-5" href={shareLink}>Invite More</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </div>
  
};
