import React from 'react'

const Post = () => {
  return (
    <div className="post">
        <div className="image">
        <img src="https://www.thenews.com.pk/assets/uploads/updates/2023-07-17/1091472_7241710_khloe-kardashian-(1)_updates.jpg" alt="" />
        </div>
        <div className="text">
        <h2>Khloe Kardashian breaks silence on Kylie Jenner and Jordyn Woods reunion</h2>
        <p className="info">
          <a href="author">Bugatti</a>
          <time>2023-07-18 15:53</time>
        </p>
        <p className="summary">After Kylie Jenner's unexpected reconciliation with former best friend Jordyn Woods on Sunday, Khloe Kardashian shared a series of cryptic messages. The reality TV star was deeply hurt by Jordyn's betrayal in February 2019, when she kissed Tristan Thompson, Khloe's baby daddy, at a party, leading to their breakup. Khloe is now struggling to come to terms with the surprising turn of events.</p>
        </div>
      </div>
  )
}

export default Post