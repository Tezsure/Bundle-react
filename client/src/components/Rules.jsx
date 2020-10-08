import React from 'react'

const Rules = () => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="row pt-5">
                    <div className="col">
                        <h2 className="font-weight-bold">
                            About
                        </h2>
                    </div>
                </div>
                <div className="row">
                        <div className="col-md-4">
                            <img alt="about page" src="https://image.freepik.com/free-vector/characters-people-holding-blockchain-network_53876-26824.jpg" style={{ width: '500px' }} />
                        </div>
                        <div className="col-md-1">

                        </div>
                        <div className="col-md-7">
                            The` DAO (stylized Đ) was a digital decentralized autonomous organization, and a form of investor-directed venture capital fund. It launched in April 2016 after a crowdfunding campaign. By September 2016, it was delisted and had, in effect, become defunct.
                            <br /><br />
                            The DAO had an objective to provide a new decentralized business model for organizing both commercial and non-profit enterprises. It was instantiated on the Ethereum blockchain, and had no conventional management structure or board of directors. The code of the DAO is open-source.
                            <br /><br />
                            The DAO was stateless, and not tied to any particular nation state. As a result, many questions of how government regulators would deal with a stateless fund were yet to be dealt with.
                            <br /><br />
                            The DAO was crowdfunded via a token sale in May 2016, and it was one of the largest crowdfunding campaigns in history.
                            <br /><br />
                            In June 2016, users exploited a vulnerability in The DAO code to enable them to siphon off one-third of The DAO's funds to a subsidiary account. On 20 July 2016 01:20:40 PM +UTC at Block 1920000, the Ethereum community decided to hard-fork the Ethereum blockchain to restore virtually all funds to the original contract. This was controversial, and led to a fork in Ethereum, where the original unforked blockchain was maintained as Ethereum Classic, thus breaking Ethereum into two separate active blockchains, each with its own cryptocurrency.
                            <br /><br />
                            The` DAO was delisted from trading on major exchanges such as Poloniex and Kraken in late 2016.
                        </div>
                    </div>
            </div>
        </React.Fragment>
    );
}

export default Rules;