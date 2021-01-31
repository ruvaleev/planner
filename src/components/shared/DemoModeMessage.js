import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

function DemoModeMessage({ isDemo }) {
  const { t } = useTranslation();

  return isDemo
    && (
    <div className="fixed bottom-0 text-red-300 font-black text-2xl w-full flex justify-center">
      {t('demo mode message')}
    </div>
    );
}

const mapStateToProps = (state) => ({
  isDemo: state.authenticationsReducer.isDemo,
});

export default connect(mapStateToProps)(DemoModeMessage);

DemoModeMessage.propTypes = {
  isDemo: PropTypes.bool.isRequired,
};
