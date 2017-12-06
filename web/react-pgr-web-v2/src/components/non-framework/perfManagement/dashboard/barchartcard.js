import React, { Component } from 'react';
import {
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend
} from 'recharts';
import {
    Card, 
    CardText, 
    CardMedia, 
    CardHeader, 
    CardTitle
} from 'material-ui/Card';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
var jp = require('jsonpath')

export default class BarChartCard extends Component {
    constructor(props) {
        super(props)
        this.state  = {
            data: [],
            dataKey: null
        }
    }

    componentDidMount() {
        console.log(this.props.data)
        this.formatParsedChartData(this.parseCompareSearchResponse(this.props.data), (data, dataKey) => {
            if (!data || !dataKey) {

            } else {
                this.setState({
                    data: data,
                    dataKey: dataKey
                })
            }
        })
    }

    /**
     * parsing and arranging search response
     */
    flattenArray(array) {
        let self = this
        return array.reduce(function(memo, el) {
          var items = Array.isArray(el) ? self.flattenArray(el) : [el];
          return memo.concat(items);
        }, []);
    }

    parseCompareSearchResponse(res) {
        return this.flattenArray(jp.query(res, '$.ulbs[*]').map((ulbs, index) => {
            return jp.query(ulbs, '$.finYears[*]').map((finYears, index) => {
                return jp.query(finYears, '$.kpiValues[*]').map((kpis, index) => {
                    return {
                        ulbName: jp.query(ulbs, '$.ulbName').join(''),
                        finYear:jp.query(finYears, '$.finYear').join(''),
                        kpiName:jp.query(kpis, '$.kpi.name').join(''),
                        target: parseInt(jp.query(kpis, '$.kpi.kpiTargets[*].targetValue').join('')),
                        value: parseInt(jp.query(kpis, '$.consolidatedValue').join(''))
                    }
                })
            })
        }))
    }

    formatParsedChartData(data, cb) {
        let parsed = {
            data: data
        }
        let chartData       = [];
        let chartDataKey    = "";
        let ulbs        = [...new Set(jp.query(parsed, '$.data[*].ulbName'))];
        let finYears    = [...new Set(jp.query(parsed, '$.data[*].finYear'))];
        let kpis        = [...new Set(jp.query(parsed, '$.data[*].kpiName'))];

        if (kpis.length === 1) {
            if (finYears.length > 1 && ulbs.length > 1) {
                chartData       = data.filter((el) => el.ulbName === ulbs[0])
                chartDataKey    = "finYear"
                return cb(chartData, chartDataKey)
            }
            if (finYears.length > 1 && ulbs.length === 1) {
                chartData       = data;
                chartDataKey    = "finYear"
                return cb(chartData, chartDataKey)
            }
            if (finYears.length === 1 && ulbs.length > 1) {
                chartData       = data;
                chartDataKey    = "ulbName"
                return cb(chartData, chartDataKey)
            }
            if (finYears.length === 1 && ulbs.length === 1) {
                chartData       = data;
                chartDataKey    = "finYear"
                return cb(chartData, chartDataKey)
            }
        }

        if (kpis.length > 1) {
            if (finYears.length > 1 && ulbs.length > 1) {
                chartData       = data.filter((el) => el.ulbName === ulbs[0])
                chartDataKey    = "finYear"
                return cb(chartData, chartDataKey)
            }
            if (finYears.length > 1 && ulbs.length === 1) {
                chartData       = data.filter((el) => el.finYear ===finYears[0])
                chartDataKey    = "finYear"
                return cb(chartData, chartDataKey)
            }
            if (finYears.length === 1 && ulbs.length > 1) {
                chartData       = data.filter((el) => el.ulbName === ulbs[0])
                chartDataKey    = "finYear"
                return cb(chartData, chartDataKey)
            }
            if (finYears.length === 1 && ulbs.length === 1) {
                chartData       = data;
                chartDataKey    = "kpiName"
                return cb(chartData, chartDataKey)
            }
        }
        return cb(null, null)
    }

    render () {
        return (
            <div>
            {
                this.renderChart()
                // this.renderTable()
            }
            </div>
        )
    }

    /**
     * render
     * presents chart
     */
    renderChart = () => {

        if (this.state.data.length < 1) {
            return (
                <div style={{"textAlign": "center"}}>
                    <br /><br />
                    <Card className="uiCard">
                        <CardHeader
                            title={<strong> insufficient data to draw the chart </strong>}
                        />
                    </Card>
                </div>
            )
        }

        return (
            <div style={{"textAlign": "center"}}>
            <br /><br />
            <Card className="uiCard">
                <CardHeader
                    title={<strong> KPI chart data </strong>}
                />
                <BarChart padding={'20%'} width={600} height={500} data={this.state.data} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey={this.state.dataKey}/>
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                    <Tooltip/>
                    <Legend />
                    <Bar yAxisId="left" dataKey="target" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="value" fill="#82ca9d" />
                </BarChart>
            </Card>
        </div>
        )
    }

    /**
     * render
     * presents same data in tabular format
     */
    renderTable = () => {
        if (this.state.data.length < 1) {
            return (
                <div style={{"textAlign": "center"}}>
                    <br /><br />
                    <Card className="uiCard">
                        <CardHeader
                            title={<strong> insufficient data to draw the chart </strong>}
                        />
                    </Card>
                </div>
            )
        }

        let headers = Object.keys(this.state.data[0]);
        return (
            <div>
            <br /><br />
            <Card className="uiCard">
                <CardHeader
                    title={<strong> KPI data </strong>}
                />
                <Table style={{color:"black",fontWeight: "normal"}} bordered responsive className="table-striped">
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            {
                                headers.map((item, index) => <TableHeaderColumn>{item.toUpperCase()}</TableHeaderColumn>)
                            }
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={false}>
                        {
                            this.state.data.map((item, index) => <TableRow> {headers.map((el, index) => <TableRowColumn>{item[el]} </TableRowColumn>)} </TableRow>)
                        }
                    </TableBody>
                </Table>
            </Card>
        </div>
        )
    }
}