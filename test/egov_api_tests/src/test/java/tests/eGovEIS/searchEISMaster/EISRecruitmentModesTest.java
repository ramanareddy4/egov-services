package tests.eGovEIS.searchEISMaster;

import builders.eGovEIS.searchEISMaster.RequestInfoBuilder;
import builders.eGovEIS.searchEISMaster.SearchEmployeeMasterRequestBuilder;
import com.jayway.restassured.response.Response;
import entities.requests.eGovEIS.searchEISMaster.RequestInfo;
import entities.requests.eGovEIS.searchEISMaster.SearchEmployeeMasterRequest;
import entities.responses.eGovEIS.searchEISMasters.recruitmentModes.SearchRecruitmentModesResponse;
import entities.responses.login.LoginResponse;
import org.junit.Assert;
import org.testng.annotations.Test;
import resources.searchEISMaster.EISMasterResource;
import utils.*;

import java.io.IOException;

import static data.UserData.NARASAPPA;

public class EISRecruitmentModesTest {

    @Test(groups = {Categories.HR, Categories.SANITY})
    public void searchRecruitmentModesTest() throws IOException {

        // Login Test
        LoginResponse loginResponse = LoginAndLogoutHelper.login(NARASAPPA);

        // Search RecruitmentModes Test
        searchRecruitmentModesTestMethod(loginResponse);
    }

    private void searchRecruitmentModesTestMethod(LoginResponse loginResponse) throws IOException {

        RequestInfo requestInfo = new RequestInfoBuilder()
                .withAuthToken(loginResponse.getAccess_token())
                .build();

        SearchEmployeeMasterRequest searchEmployeeMasterRequest = new SearchEmployeeMasterRequestBuilder()
                .withRequestInfo(requestInfo)
                .build();

        Response response = new EISMasterResource().
                searchRecruitmentModesType(RequestHelper.getJsonString(searchEmployeeMasterRequest));

        SearchRecruitmentModesResponse searchRecruitmentModesResponse = (SearchRecruitmentModesResponse)
                ResponseHelper.getResponseAsObject(response.asString(), SearchRecruitmentModesResponse.class);

        Assert.assertEquals(response.getStatusCode(), 200);
        Assert.assertEquals(searchRecruitmentModesResponse.getRecruitmentMode().length, 3);

        new APILogger().log("Search Recruitment Modes Test is Completed--");
    }

}