import React from "react";
import { Card } from "material-ui";
import { CardContent, Typography } from "material-ui";
import "../../variables/css/recommendationsStyle.css";
import { Grid } from "material-ui";
import ItemGrid from "../../components/Grid/ItemGrid";

class Recommendations extends React.Component {
	constructor(props) {
		super(props);
		console.log("HI");
	}

	render() {
		return (
			<div className="local-bootstrap">
				<Card>
					<div className="mainRecommendationsContainer">
						<CardContent>
							<Typography variant="h1" component="h1">Investment Recommendations</Typography>
						</CardContent>

						<CardContent>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
								<span className="input-group-text" id="basic-addon1">Load Quote</span>
								</div>
								<input type="text" className="form-control" placeholder="Search Crypto" aria-label="Search" aria-describedby="basic-addon1"/>
							</div>
						</CardContent>

						<div>
							<CardContent>
								<Grid container>
									<ItemGrid xs={12} sm={6} md={6}>
										<Typography variant="h3" component="h3">Latest Quote</Typography>
										<Card>
											<div className="latestQuoteCard">
												<CardContent>
													
												</CardContent>
											</div>
										</Card>
									</ItemGrid>

									<ItemGrid xs={12} sm={6} md={6}>

									</ItemGrid>
								</Grid>
							</CardContent>
						</div>
					</div>
				</Card>
			</div>
		)
	}
};

export default Recommendations;