import React, {useEffect} from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncActionGenerator, GET_OPENING } from '../../redux/actions';
import { withNamespaces } from "react-i18next";

const gethoursActions = asyncActionGenerator(GET_OPENING);

const OpeningHour = props => {
    const {match, openinghours, getHours ,t} = props;
    const id = match.params.id || null;
    useEffect(()=>{
     if(id) {
        getHours({
            merchant_id: id
        })
     }   
    },[id,getHours])
    return (
        <div className="view-menu-section">
            {
                <div className="opeing-hours-data">
                  <div>
                    <h3>{t("Monday")}:</h3>
                    <span>{openinghours[0] && openinghours[0]['monday'] ? openinghours[0]['monday'] : '--'}</span>
                  </div>
                  <div>
                    <h3>{t("Tuesday")}:</h3>
                    <span>{openinghours[0] && openinghours[0]['tuesday'] ? openinghours[0]['tuesday'] : '--'}</span>
                  </div>
                    <div>
                    <h3>{t("Wednesday")}:</h3>
                    <span>{openinghours[0] && openinghours[0]['wednesday'] ? openinghours[0]['wednesday'] : '--'}</span>
                    </div>
                    <div>
                    <h3>{t("Thursday")}:</h3>
                    <span>{openinghours[0] && openinghours[0]['thursday'] ? openinghours[0]['thursday'] : '--'}</span>
                    </div>
                    <div>
                    <h3>{t("Friday")}:</h3>
                    <span>{openinghours[0] && openinghours[0]['friday']? openinghours[0]['friday'] : '--'}</span>
                    </div>
                    <div>
                    <h3>{t("Saturday")}</h3>
                    <span>{openinghours[0] && openinghours[0]['saturday']? openinghours[0]['saturday'] : '--'}</span>
                    </div>
                    <div>
                    <h3>{t("Sunday")}</h3>
                    <span>{openinghours[0] && openinghours[0]['sunday']? openinghours[0]['sunday'] : '--'}</span>
                    </div>
                </div>
            }
        </div>
    )
};
const mapStateToProps = (state) => ({
    openinghours: state.RestaurantReducer.openinghours,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getHours: gethoursActions.request,
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withNamespaces()(OpeningHour)));
