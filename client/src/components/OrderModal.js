import React from 'react';
import { Modal } from 'antd'

const OrderModal = ({session, orderedBy, showModal, setShowModal}) => {
    return (
        <Modal visible={showModal} title='Payment Details' 
                    onCancel={() => setShowModal(!showModal)}>
                        <p>Payment reference number: {session.payment_intent}</p>
                        <p>Payment status: {session.payment_status}</p>
                        <p>Payment total: {session.currency.toUpperCase()}{' '}
                        {session.amount_total / 100}</p>
                        <p>Stripe id: {session.customer}</p>
                        <p>Name: {orderedBy.name}</p>
                        </Modal>
    );
};

export default OrderModal;