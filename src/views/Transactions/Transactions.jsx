import React from "react";
import { Grid } from "material-ui";

import { RegularCard, Button, Table, CustomInput, ItemGrid } from "components";

function Transaction({ ...props}){
    return (
      <div>
        <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
                <RegularCard
                    cardTitle="Current Funds"
                    contant={
                        <Table/>
                    }
                />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12}>
                <RegularCard
                    cardTitle="Current Holdings"
                    content={
                      <Table
                      tableHeaderColor="primary"
                      tableHead={["Tick", "Name", "Price", "MarketCap", "Volume(24H)", "Circulating", "1h", "24h", "Weekly"]}
                      tableData={[
                          ["BTC", "Bitcoin", "Oud-Turnhout", "$36,738","Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", "$36,738"],
                      ]}
                      />
                    }
                />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
              <RegularCard
                cardTitle="Add Money"
                content={
                  <div>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Amount:"
                          id="add-money"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md={8}>
                        <CustomInput
                          labelText="Registered Mobile Number: "
                          id="add-money"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </ItemGrid>
                    </Grid>
                    
                  </div>
                }
              />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
              <RegularCard
                cardTitle="Withdraw Money"
                cardSubtitle="Money will be added to your Bank Account"
                content={
                  <div>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Amount:"
                          id="add-money"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md={8}>
                        <CustomInput
                          labelText="Registered Mobile Number: "
                          id="add-money"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </ItemGrid>
                    </Grid>
                    <Grid container justify="center">
                      <ItemGrid xs={12} sm={12} md={5} >
                        <Button 
                          fullWidth
                          color="primary"
                          // onClick={() => }
                        >
                          Send OTP
                        </Button>	
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Enter OTP"
                            id="otp"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                      </ItemGrid>
                      <Button 
                        color="primary" 
                        round
                        // onClick={() => }
                      >
                        Processed
                      </Button>
                    </Grid>
                  </div>
                }
              />
            </ItemGrid>
        </Grid>
      </div>
    );
}

export default Transaction;