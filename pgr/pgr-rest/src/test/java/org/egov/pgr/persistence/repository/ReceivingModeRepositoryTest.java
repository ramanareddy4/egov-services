package org.egov.pgr.persistence.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

import java.util.List;

import org.egov.pgr.TestConfiguration;
import org.egov.pgr.persistence.entity.ReceivingMode;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@DataJpaTest
@Import(TestConfiguration.class)
public class ReceivingModeRepositoryTest {

	@Autowired
	private ReceivingModeRepository receivingModeRepository;

	@Test
	@Sql(scripts = { "/sql/clearReceivingMode.sql", "/sql/InsertReceivingModeData.sql" })
	public void should_fetch_all_receiving_modes() {
		final List<ReceivingMode> actualResult = receivingModeRepository.findAll();

		assertEquals(6, actualResult.size());
	}
}