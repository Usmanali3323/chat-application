import React, { Component } from "react";
import css from "../styles/search.module.scss";
import Search from "../assets/search.png";
export class search extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={css.w_container}>
        <form onSubmit={this.props.searchHandler}>
          <div className={css.weather_input}>
            <div className="city">
              <label>City </label>
              <input
                onChange={this.props.changeHandler}
                type="text"
                name="city"
                placeholder="City"
                value={this.props.city}
              />
              <button
                type="button"
                className={css.search}
                onClick={this.props.cityHandler}
              >
                <img className={css.img} src={Search} />
              </button>
            </div>
            <div className={css.main}>
              <div className={css.dir}>
                <h3>Get th Direction</h3>
                <img
                  onClick={this.props.click}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAACQ0lEQVR4nLVVyW4TQRCdOyjkyJYbAkSUqTYmVjJVo3bVOFEk1nADfgBI+AqWCH6AffuHEP6E7ZicEuDAcjd6HduaGa84yZNa05qupWt7HUUDMJ0uThHbKrF+JLHPjvUvFvYkukFsKzPen4z+FzRnJ4j1JbHtOLHXLq1fnUn0TLywcAgLexK75tjeBBm2F5WkcXwk45VErzjRbcf6oFZbmhgmX200jpDYI+jEbJcHGxe951g3z4tWR493F5XEX4AuUhr1vTnr5lg5bQG6sNEVCXKOEMe5eRluPpuFrWqaHuv8JNFXTux+QVD0pxNrdhbrzY58kt3Kn5Hoj7wuia05sef5VtxBsYoOoKzbxFm965ptQ5zVQ0OINQv/vZ8ktu/ITCgsIugKVawZc0NCd6Rq5fP8WdlB0Gd966R+F+nZQJ/3clA21Mt4XrYYnS07tvWIWL9V5vypbgd6o5wKfPP7XrJtYBid2JfIsf055/3hskD/fOvAurQBm7CN8H4fhINabWmCRH+hGF9jyU6XBQptyUNSlJNtozrvzxLrp1BkENd+Fzlmvd4qsq2AFfe7TUnsfSWx24E/DnTQAPA5sT6McsD4j0sVju0JiT7t/MBjgZuAcqM9glKrwdas90cLB6DYvdL1dLo45di2KK1f7O2dbRVOQLlj3ZxtC00zUDCW7FIortgaijXUsPeTjvVx0Ol38zLwWIDP0QlgRRAXBgcTj7U7RLZMou+CjOizrpyPgtZLd4fEPmAqwS1Yrf16OGu3Yh/8A8AmIf0WE2JdAAAAAElFTkSuQmCC"
                />
              </div>
     
                <div className={css.lat_lon}>
                  <div>
                    <label>Lat</label>
                    <input
                      onChange={this.props.changeHandler}
                      type="number"
                      name="lat"
                      placeholder="Lat"
                      value={this.props.lat}
                    />
                  </div>
                  <div>
                    <label>Lon</label>
                    <input
                      onChange={this.props.changeHandler}
                      type="number"
                      name="lon"
                      placeholder="Lat"
                      value={this.props.lon}
                    />
                  </div>
                  <button
                    // onClick={this.props.searchHandler}
                    type="submit"
                    name="search"
                  >
                    
                    search
                  </button>
                </div>
  
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default search;
