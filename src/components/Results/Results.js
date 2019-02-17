import React, { Component } from 'react';
import "./Reults.scss";
import step3 from '../PainTypeView/img/step3.png';

export default class Results extends Component {
    render() {
        const { visibleSymptoms, dia } = this.props;
        return (
            <div className="column">
                <header className="column-header" style={{ marginTop: "-13px    " }}>
                    <img src={step3} alt />
                </header>
                <p>Summary</p>
                <ul className="summary">
                    <li>Lower abdominal</li>
                    <li>Cramping pain</li>
                    {(dia) ? (<li>Diarrhea</li>) : ""}
                </ul>
                <div className="diagnosis">
                    <div className="diagnosis-header">
                        <div className="header-item">
                            <h2>Causes</h2>
                        </div>
                        <div className="header-item">
                            <h2>Treatments</h2>
                        </div>
                    </div>
                    <div className="diagnosis-content">
                        <h3>Information about your symptoms</h3>
                        <div className="diagnosis-text">
                            <p>Spasmodic pain in the lower abdomen, on the left or right side can be caused by cramping of the muscles of the colon. This pain can be accompanied by bloating, flatulence and / or changes in normal bowel movements. Buscopan® provides targeted and effective relief for this pain. However, if the pain persists, talk to your doctor.</p><br />
                            {(dia) ? (
                                <p>When you have diarrhea, your bowel movements (or stools) are loose and watery.
                                If you have watery stools more than three times a day and you're not drinking enough fluids, you could become dehydrated. That can cause serious complications if it's not treated.</p>
                            ) : ""}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}