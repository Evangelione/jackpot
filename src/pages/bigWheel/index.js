import React, { Component } from 'react';

class Index extends Component {
  render() {
    return (
      <div>
        <div className='wheel-container'>
          <div className='title'>
            <img src={require('@/assets/images/title.png')} alt=""/>
          </div>
          <div className='bigWheel'>
            <img src={require('@/assets/images/big wheel 4.png')} alt=""/>
            <div className='wheel-start'>
              <img src={require('@/assets/images/icon_start.png')} alt=""/>
            </div>
          </div>
          <div className='detail'>
            <div className='bar'>
              You have <span>3</span> raffle chances
            </div>
          </div>
        </div>

        <div className='padding-container'>


          <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>Award-winning record</div>
            </div>
            <div className='bg-gray'>
              <div className='QR-code-box'>
                <div className='QR-code'>
                  <img src={require('@/assets/images/er.png')} alt=""/>
                </div>
                <div className='QR-detail'>
                  <div>Prize: <span className='red'>vivo X23</span></div>
                  <div>Redeem code: <span className='red-bold'>876524</span></div>
                  <div>[2019-05-12 18:23:34]</div>
                </div>
              </div>
              <div className='QR-desc'>
                In sit amet condimentum felis, quis finibus sapien. Nunc felis nisi, pellentesque accumsan diam ut,
                accumsan porta turpis. Pellentesque
              </div>
            </div>

            <div className='bg-gray'>
              <div className='QR-code-box'>
                <div className='QR-code'>
                  <img src={require('@/assets/images/er.png')} alt=""/>
                </div>
                <div className='QR-detail'>
                  <div>Prize: <span className='red'>vivo X23</span></div>
                  <div>Redeem code: <span className='red-bold'>876524</span></div>
                  <div>[2019-05-12 18:23:34]</div>
                </div>
              </div>
              <div className='QR-desc'>
                In sit amet condimentum felis, quis finibus sapien. Nunc felis nisi, pellentesque accumsan diam ut,
                accumsan porta turpis. Pellentesque
              </div>
            </div>

            <div className='bg-gray'>
              <div className='QR-code-box'>
                <div className='QR-code'>
                  <img src={require('@/assets/images/er.png')} alt=""/>
                </div>
                <div className='QR-detail'>
                  <div>Prize: <span className='red'>vivo X23</span></div>
                  <div>Redeem code: <span className='red-bold'>876524</span></div>
                  <div>[2019-05-12 18:23:34]</div>
                </div>
              </div>
              <div className='QR-desc'>
                In sit amet condimentum felis, quis finibus sapien. Nunc felis nisi, pellentesque accumsan diam ut,
                accumsan porta turpis. Pellentesque
              </div>
            </div>

            <div className='bg-gray'>
              <div className='QR-code-box'>
                <div className='QR-code'>
                  <img src={require('@/assets/images/er.png')} alt=""/>
                </div>
                <div className='QR-detail'>
                  <div>Prize: <span className='red'>vivo X23</span></div>
                  <div>Redeem code: <span className='red-bold'>876524</span></div>
                  <div>[2019-05-12 18:23:34]</div>
                </div>
              </div>
              <div className='QR-desc'>
                In sit amet condimentum felis, quis finibus sapien. Nunc felis nisi, pellentesque accumsan diam ut,
                accumsan porta turpis. Pellentesque
              </div>
            </div>
          </div>


          <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>The prize list</div>
            </div>
            <div className='prize-list'>
              <div className='prize'>
                <div>
                  <img src={require('@/assets/images/vergil.jpg')} alt=""/>
                </div>
                <div>
                  <div>First Prize</div>
                  <div>Vergil</div>
                  <div>Quantity: 100</div>
                </div>
              </div>
              <div className='prize'>
                <div>
                  <img src={require('@/assets/images/vergil.jpg')} alt=""/>
                </div>
                <div>
                  <div>First Prize</div>
                  <div>Vergil</div>
                  <div>Quantity: 100</div>
                </div>
              </div>
              <div className='prize'>
                <div>
                  <img src={require('@/assets/images/vergil.jpg')} alt=""/>
                </div>
                <div>
                  <div>First Prize</div>
                  <div>Vergil</div>
                  <div>Quantity: 100</div>
                </div>
              </div>
            </div>
          </div>

          <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>Event description</div>
            </div>
            <div className='bg-gray'>
              Vestibulum pharetra dui ut erat venenatis, in vulputate mi varius. Integer sed sollicitudin felis. Morbi
              mauris sem, pellentesque sit amet eleifend sed, egestas ac est. Phasellus non dolor vitae
            </div>
          </div>

          <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>The latest winners list</div>
            </div>
            <div className='bg-gray' style={{ padding: '6px 2px' }}>
              <div className='winners-item'>
                <div className='name'>Richard ****</div>
                <div className='code'>751360 ****</div>
                <div className='prize'>vivo X23</div>
                <div className='time'>2019-05-12</div>
              </div>
              <div className='winners-item'>
                <div className='name'>Richard ****</div>
                <div className='code'>751360 ****</div>
                <div className='prize'>vivo X23</div>
                <div className='time'>2019-05-12</div>
              </div>
              <div className='winners-item'>
                <div className='name'>Richard ****</div>
                <div className='code'>751360 ****</div>
                <div className='prize'>vivo X23</div>
                <div className='time'>2019-05-12</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
