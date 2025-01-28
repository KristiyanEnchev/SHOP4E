function Rating(props) {
  const { rating, numReviews } = props;

  function getRating(num) {
    if (rating >= num && rating < num + 0.5) {
      return 'fa fa-star-o';
    } else if (rating >= num + 0.5 && rating < num + 1) {
      return 'fas fa-star-half-alt';
    } else if (rating >= num + 1) {
      return 'fa fa-star';
    }

    return 'fa fa-star-o';
  }
  return (
    <div className="product__details__rating">
      {numReviews === 0 ? (
        <>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
        </>
      ) : (
        <>
          <i className={getRating(1)}></i>
          <i className={getRating(2)}></i>
          <i className={getRating(3)}></i>
          <i className={getRating(4)}></i>
          <i className={getRating(5)}></i>
        </>
      )}

      <span>({numReviews} reviews)</span>
    </div>
  );
}

export default Rating;
