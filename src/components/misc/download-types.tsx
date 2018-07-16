import KnappBase from "nav-frontend-knapper";
import * as React from "react";
import './misc.less';

class DownloadTypes extends React.Component {

    public render() {
        return (
            <div className="download-types">
                <div>
                    <KnappBase type='flat'
                               mini={true}>
                        svg
                    </KnappBase>
                    <KnappBase type='flat'
                               mini={true}>
                        png
                    </KnappBase>
                    <KnappBase type='flat'
                               mini={true}>
                        pdf
                    </KnappBase>
                </div>
                <div>
                    <KnappBase type='flat'
                               mini={true}>
                        ai
                    </KnappBase>
                    <KnappBase type='flat'
                               mini={true}>
                        sketch
                    </KnappBase>
                    <KnappBase type='flat'
                               mini={true}>
                        eps
                    </KnappBase>
                </div>
            </div>
        );
    }
}

export default DownloadTypes;


